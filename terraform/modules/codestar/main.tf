# Note that this resource is in PENDING state until handshake is manually done
# https://docs.aws.amazon.com/dtconsole/latest/userguide/connections-update.html
resource "aws_codestarconnections_connection" "this" {
  name          = var.project_name
  provider_type = "GitHub"
}
