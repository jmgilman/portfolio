organization_name  = "glab"
project_name       = "portfolio"
environment        = "dev"
repo_name          = "jmgilman/portfolio"
buildspec_file     = "../../buildspec.yml"
build_image        = "jmgilman/nix-aws-codebuild"
build_compute_type = "BUILD_GENERAL1_SMALL"
build_policies = [
  {
    Action   = "ssm:GetParameters"
    Effect   = "Allow"
    Resource = "arn:aws:ssm:us-west-2:915992312785:parameter/portfolio/cachix-key"
  }
]
