from rest_framework import status
from .serializer import ProductCategorySerializer,SliderImageSerializer,ProductSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import ProductCategory,SliderImages,Product

@api_view(['GET'])
def get_product_categories(request):
    categories = ProductCategory.objects.all()
    serializer = ProductCategorySerializer(categories, many=True)
    category_names = [category.name for category in categories]
    return Response({"success": True, "category_name": category_names}, status=status.HTTP_200_OK)
@api_view(["GET"])
def get_image_sliders(request):
    image = SliderImages.objects.all()
    serializer = SliderImageSerializer(image, many=True)
    image_urls = [image['image'] for image in serializer.data]
    return Response({'image': image_urls},status=status.HTTP_200_OK)
@api_view(['GET'])
def get_products(request):
    product = Product.objects.all()
    serializer =ProductSerializer(product, many=True)
    product_image= [product['product_image']for product in serializer.data]
    return Response({"product":serializer.data,"product_image":product_image},status=status.HTTP_200_OK)

@api_view(['GET'])
def get_product_details(request,productId):
    product = Product.objects.get(id=productId)
    serializer = ProductSerializer(product)
    product_image = serializer.data.get('product_image')
    return Response({"product":serializer.data, "product_image":product_image}, status=status.HTTP_200_OK)
@api_view(['GET'])
def get_cart_products(request, cartItems):
    cart_item_ids = cartItems.split(',') 
    products = Product.objects.filter(id__in=cart_item_ids)
    serializer = ProductSerializer(products, many=True)
    product_data = serializer.data
    product_image = [product['product_image'] for product in product_data] if isinstance(product_data, list) else product_data.get('product_image')
    return Response({"product": product_data , "product_image": product_image}, status=status.HTTP_200_OK)
