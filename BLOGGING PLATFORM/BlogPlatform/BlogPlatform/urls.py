# urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views
from blog import views
urlpatterns = [
    path('admin/', admin.site.urls),
    path('blog/', include('blog.urls')),  
    path('accounts/', include('django.contrib.auth.urls')), 
    path('logout/', auth_views.LogoutView.as_view(template_name='logout.html'), name='logout'),
    path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    path('like/', views.like_post, name='like_post'),
    path('add_comment/', views.add_comment, name='add_comment'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

