output "s3_bucket_arn" {
  description = "ARN of the website bucket"
  value       = aws_s3_bucket.this.arn
}

output "s3_bucket_name" {
  description = "Name of the website bucket"
  value       = aws_s3_bucket.this.id
}
