from django.db import models
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator

BASE_URL = "http://localhost:8000"


class ProductCategory(models.Model):
    name = models.CharField(max_length=500)
    description = models.TextField()

    def __str__(self):
        return self.name


class Product(models.Model):
    PRODUCT_SIZES = (
        ("S", "Small"),
        ("M", "Medium"),
        ("L", "Large"),
        ("XL", "Extra Large")
    )
    product_name = models.CharField(max_length=100)
    product_price = models.IntegerField(default=None)
    quantity = models.IntegerField()
    product_size = models.CharField(
        max_length=10, choices=PRODUCT_SIZES, default="S")
    product_description = models.TextField()
    product_image = models.FileField(upload_to='product_images/', default=None, validators=[
        FileExtensionValidator(allowed_extensions=[
                               'png', 'jpeg', 'jpg', 'tif']),
    ])
    product_category = models.ForeignKey(
        ProductCategory, on_delete=models.CASCADE)

    def __str__(self):
        return self.get_absolute_url()

    def get_absolute_url(self):
        return f"{BASE_URL}{self.product_image}"

    def __str__(self):
        return self.product_name


class Order(models.Model):
    order_name = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now=True)
    ordered_by = models.ForeignKey(User, on_delete=models.CASCADE)
    products = models.ManyToManyField(Product)

    def __str__(self):
        return self.order_name


class SliderImages(models.Model):
    image = models.FileField(upload_to='imageSliders/', default=None, validators=[
        FileExtensionValidator(allowed_extensions=['png', 'jpeg', 'jpg', 'tif'])])

    def __str__(self):
        return self.get_absolute_url()

    def get_absolute_url(self):
        return f"{BASE_URL}{self.image.url}"
