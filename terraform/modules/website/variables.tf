variable "bucket_name" {
  description = "Name of the S3 bucket to create for the website"
  type        = string
}

variable "error_file" {
  description = "Object key for errors"
  type        = string
  default     = "404.html"
}

variable "index_file" {
  description = "Object key for the index"
  type        = string
  default     = "index.html"
}
