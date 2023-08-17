from django.conf import settings
from django.conf.urls.static import static
from django.urls import re_path
from . import views
urlpatterns = [
    re_path(r'^api/get_product_categories/$', views.get_product_categories),
    re_path(r'^api/get_image_sliders/$', views.get_image_sliders),
    re_path(r'^api/get_products/$',views.get_products),
    re_path(r'^api/get_product_details/(?P<productId>\d+)$', views.get_product_details),
   re_path(r'^api/get_cart_products/(?P<cartItems>[\d,]+)$', views.get_cart_products),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
