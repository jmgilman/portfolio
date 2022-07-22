variable "project_name" {
  description = "Name of the CodeBuild project to create"
  type        = string
}

variable "buildspec_file" {
  description = "Location of the buildspec.yml file"
  type        = string

}

variable "artifact_store_arn" {
  description = "ARN of the artifact store S3 bucket"
  type        = string
}

variable "artifact_store_name" {
  description = "Name of the artifact store S3 bucket"
  type        = string
}

variable "codestar_arn" {
  description = "ARN of the Codestar connection for pulling source code"
  type        = string
}

variable "build_image" {
  description = "Docker image used by the build agent"
  type        = string
}

variable "build_compute_type" {
  description = "Build agent size"
  type        = string
}

variable "extra_policies" {
  description = "Extra policies to add to CodeBuild role"
  type        = list(map(any))
  default     = []
}
