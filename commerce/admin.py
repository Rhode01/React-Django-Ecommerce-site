from django.contrib import admin
from .models import ProductCategory, Order, Product, SliderImages

admin.site.register(Product)
admin.site.register(ProductCategory)
admin.site.register(Order)
admin.site.register(SliderImages)

