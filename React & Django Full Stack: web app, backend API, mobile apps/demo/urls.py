from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'persons', views.PersonViewSet)
router.register(r'accounts', views.AccountViewSet)
router.register(r'contacts', views.ContactViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
