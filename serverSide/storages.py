from storages.backends.s3boto3 import S3Boto3Storage
# this feeds the DEFAULT_FILE_STORAGE=> MEDIA in settings
class MediaStore(S3Boto3Storage):
    location ='media'
    default_acl = 'public-read'
    file_override = False
    custom_domaine = False