output "codestarconnections_connection_arn" {
  description = "ARN of the Codestar connection"
  value       = aws_codestarconnections_connection.this.arn
}
