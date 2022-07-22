terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.22.0"
    }
  }

  backend "s3" {
    bucket  = "glab-dev-terraform"
    region  = "us-west-2"
    key     = "portfolio"
    encrypt = true
  }
}

provider "aws" {
  allowed_account_ids = ["915992312785"]
}

data "aws_region" "current" {}

data "aws_caller_identity" "current" {}

module "artifact_store" {
  source = "../../modules/artifact_store"

  bucket_name = "${var.organization_name}-${var.project_name}-${var.environment}-artifact-store"
}

module "codestar" {
  source = "../../modules/codestar"

  project_name = var.project_name
}

module "website" {
  source = "../../modules/website"

  bucket_name = "${var.organization_name}-${var.project_name}-${var.environment}-website"
}

module "codebuild" {
  source = "../../modules/codebuild"

  project_name        = var.project_name
  buildspec_file      = var.buildspec_file
  artifact_store_arn  = module.artifact_store.s3_bucket_arn
  artifact_store_name = module.artifact_store.s3_bucket_name
  codestar_arn        = module.codestar.codestarconnections_connection_arn
  build_image         = var.build_image
  build_compute_type  = var.build_compute_type
  extra_policies      = var.build_policies
}

module "codepipeline" {
  source = "../../modules/codepipeline"

  project_name          = var.project_name
  project_repo          = var.repo_name
  artifact_store_arn    = module.artifact_store.s3_bucket_arn
  artifact_store_name   = module.artifact_store.s3_bucket_name
  website_bucket_arn    = module.website.s3_bucket_arn
  website_bucket_name   = module.website.s3_bucket_name
  codestar_arn          = module.codestar.codestarconnections_connection_arn
  codebuild_project_arn = module.codebuild.codebuild_project_arn
}
