from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('register/', views.register, name='register'),
    path('like/', views.like_post, name='like_post'),
    path('add_comment/', views.add_comment, name='add_comment'),
    path('managepost/', views.managepost, name='managepost'),
    path('posts/', views.posts, name='posts'),
    path('post/<int:pk>/edit/', views.PostUpdate.as_view(), name='post_edit'),
    path('post/<int:pk>/', views.PostDetail.as_view(), name='post_detail'),
    path('post/<int:pk>/delete/', views.PostDelete.as_view(), name='post_delete'),
]
