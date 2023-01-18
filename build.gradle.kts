import com.github.gradle.node.npm.task.NpmTask
import org.hidetake.gradle.swagger.generator.GenerateSwaggerUI
import org.openapitools.generator.gradle.plugin.tasks.GenerateTask
import org.openapitools.generator.gradle.plugin.tasks.ValidateTask
import java.io.ByteArrayOutputStream


plugins {
    java
    id("com.github.node-gradle.node") version "3.5.1"
    id("org.openapi.generator") version "6.2.1"
    id("org.hidetake.swagger.generator") version "2.19.2"
}

group = "org.ims"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    swaggerUI("org.webjars:swagger-ui:3.52.5")
}


/**
 * Directories and paths for the input schemata
 */
val ltiDirectory = "lti"
val ltiJsonSchemaUrl = "https://purl.imsglobal.org/spec/lti/v1p3/schema/json/LtiResourceLinkRequest.json"
val ltiJsonSchemaPath = "$ltiDirectory/input-jsonschema.json"
val ltiOpenApiPath = "$ltiDirectory/intermediate-openapi-spec.yaml"
val agsDirectory = "assignment-and-grade-services"
val agsOpenApiUrl = "https://www.imsglobal.org/sites/default/files/specs/lti/1p3/openapi/openapi_full_0.yaml"
val agsOpenApiPath = "$agsDirectory/input-openapi-spec.yaml"


/**
 * Download the schemata to the project directory
 */
val downloadSchemata = "downloadSchemata"
tasks.register(downloadSchemata) {
    download(ltiJsonSchemaUrl, ltiJsonSchemaPath)
    download(agsOpenApiUrl, agsOpenApiPath)
}


/**
 * The LTI specification is a JSON Schema (https://json-schema.org/). The typeconv package
 * (https://github.com/grantila/typeconv) can work with JSON Schema, but it isn't very robust and doesn't have as much
 * coverage as OpenAPI Generator (https://openapi-generator.tech/docs/generators/). So, we use typeconv to convert the
 * JSON Schema to an OpenAPI specification.
 */

val typeConvInstall = "typeConvInstall"
tasks.register<NpmTask>(typeConvInstall) {
    dependsOn("npmInstall")
    args.set(listOf("install", "typeconv"))
}

val ltiJsonSchemaToOpenApi = "ltiJsonSchemaToOpenapi"
tasks.register<Exec>(ltiJsonSchemaToOpenApi) {
    dependsOn(downloadSchemata)
    dependsOn(typeConvInstall)
    commandLine = listOf(
        "npx", "typeconv",
        "-f", "jsc",
        "-t", "oapi",
        "-o", ltiDirectory,
        "-O", "-",
        "--oapi-version", "3.0",
        "--oapi-title", "Learning Tools Interoperability Version 1.3 Final Release JSON Schema Binding (schema-deeplinkingrequest)",
        ltiJsonSchemaPath
    )
    standardOutput = ByteArrayOutputStream()
    doLast {
        project.file(ltiOpenApiPath).writeText(standardOutput.toString())
    }
}


/**
 * We loop over generator and schema configurations to create Gradle code generation tasks
 *
 * NOTE: The "Assignment and Grade Services" OpenAPI spec (provided by IMS) is invalid, so there is a conditional
 * skip in the code below.
 */

val generateLti = "generateLti"
val generateAgs = "generateAgs"
tasks.register(generateLti)
tasks.register(generateAgs)

val generators = listOf(
    "graphql-schema",
    "kotlin",
    "python-fastapi",
    "typescript",
)

val generatorOptions = mapOf(
//    "graphql-schema" to mapOf("packageName" to "graphql-ims"),
    "kotlin" to mapOf("library" to "multiplatform"),
)

data class SpecOption(
    val task: String,
    val location: String,
    val parent: String,
    val lastUpstreamTask: String
)

val specOptions = listOf(
    SpecOption(generateLti, ltiOpenApiPath, ltiDirectory, ltiJsonSchemaToOpenApi),
    SpecOption(generateAgs, agsOpenApiPath, agsDirectory, downloadSchemata)
)

for (opt in specOptions) {

    /**
     * Swagger UI task to generate /doc
     */
    val swaggerUiTaskName = "${opt.task}_subtask_swagger_ui"
    tasks.register<GenerateSwaggerUI>(swaggerUiTaskName) {
        dependsOn(opt.lastUpstreamTask)
        inputFile = file(opt.location)
        outputDir = file("${opt.parent}/doc")
    }

    tasks.getByName(opt.task) {
        dependsOn(swaggerUiTaskName)
    }

    /**
     * Skips the remainder for AGS
     */
    if (opt.task == generateAgs) {
        continue
    }

    /**
     * Single validation subtask
     *
     * Note: Fails for AGS
     */
    val validateTaskName = "${opt.task}_subtask_validate"
    tasks.register<ValidateTask>(validateTaskName) {
        dependsOn(opt.lastUpstreamTask)
        inputSpec.set(opt.location)
        recommend.set(false)
    }

    /**
     * Subtasks for each generator
     */
    for (generator in generators) {
        val generateTaskName = "${opt.task}_subtask_${generator}"
        tasks.register<GenerateTask>(generateTaskName) {
            dependsOn(validateTaskName)
            generatorName.set(generator)
            inputSpec.set(opt.location)
            outputDir.set("${opt.parent}/$generator")
            generatorOptions[generator]?.let {
                configOptions.set(it)
            }
            skipValidateSpec.set(true)
        }
        tasks.getByName(opt.task) {
            dependsOn(generateTaskName)
        }
    }
}


/**
 * Combined `generate` task
 */
tasks.register("generate") {
    dependsOn(generateLti)
    dependsOn(generateAgs)
}


/**
 * Download a file to the project, creating any necessary parent directories
 */
fun download(url: String, path: String){
    val destFile = project.file(path)
    if (!destFile.parentFile.exists()) {
        destFile.parentFile.mkdirs()
    }
    ant.invokeMethod("get", mapOf("src" to url, "dest" to destFile))
}