variable "organization_name" {
  description = "Name of the organization"
  type        = string
}

variable "project_name" {
  description = "Name of the project"
  type        = string
}

variable "environment" {
  description = "Name of environment"
  type        = string
}

variable "repo_name" {
  description = "Name of the Github repository"
  type        = string
}

variable "buildspec_file" {
  description = "Path to the buildspec.yml file"
  type        = string
}

variable "build_image" {
  description = "Name of the Docker image the build agent should use"
  type        = string
}

variable "build_compute_type" {
  description = "Type of compute to use for build"
  type        = string
}

variable "build_policies" {
  description = "Additional policy rules for CodeBuild"
  type        = list(map(any))
  default     = []
}
