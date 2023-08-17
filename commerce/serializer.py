from rest_framework import serializers
from .models import Product, Order,ProductCategory, SliderImages

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"
class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = "__all__"

class SliderImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SliderImages
        fields = "__all__"