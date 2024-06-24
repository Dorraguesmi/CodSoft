from django.shortcuts import get_object_or_404, redirect, render
from django.http import JsonResponse
from django.urls import reverse_lazy
from django.views.generic import DetailView, UpdateView, DeleteView
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import Post, Like, Comment
from .forms import PostForm

def home(request):
    posts = Post.objects.all()
    return render(request, 'blog/home.html', {'posts': posts})

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=password)
            login(request, user)
            messages.success(request, f'Welcome {username}, your account has been created successfully!')
            return redirect('login')
    else:
        form = UserCreationForm()
    return render(request, 'signup.html', {'form': form})

@login_required
def like_post(request):
    if request.method == 'POST':
        post_id = request.POST.get('post_id')
        post = get_object_or_404(Post, pk=post_id)
        existing_like = Like.objects.filter(user=request.user, post=post).first()
        if existing_like:
            existing_like.delete()
            liked = False
        else:
            like = Like(user=request.user, post=post)
            like.save()
            liked = True
        response_data = {
            'liked': liked,
            'like_count': post.likes.count()  
        }
        if request.headers.get('x-requested-with') == 'XMLHttpRequest':
            return JsonResponse(response_data)
        else:
            return redirect(request.META.get('HTTP_REFERER', 'redirect_if_referer_not_found'))
    return redirect('home', pk=post_id)

@login_required
def add_comment(request):
    if request.method == 'POST':
        post_id = request.POST.get('post_id')
        content = request.POST.get('content')
        post = get_object_or_404(Post, pk=post_id)
        Comment.objects.create(post=post, user=request.user, content=content)
    return redirect('home')

@login_required
def managepost(request):
    if request.method == 'POST':
        form = PostForm(request.POST, request.FILES)
        if form.is_valid():
            post = form.save(commit=False)
            post.creator = request.user
            post.save()
            messages.success(request, 'New Post created successfully.')
            return redirect('home')
        else:
            messages.error(request, 'Failed to create the Post.')
    else:
        form = PostForm(initial={'creator': request.user})  
    return render(request, 'blog/newpost.html', {'form': form})

def posts(request):
    posts = Post.objects.all()
    return render(request, 'blog/ListPosts.html', {'posts': posts})


class PostDelete(LoginRequiredMixin, DeleteView):
    model = Post
    template_name = 'blog/post_confirm_delete.html'
    success_url = reverse_lazy('home')

class PostDetail(LoginRequiredMixin, DetailView):
    model = Post
    template_name = 'blog/post_detail.html'

class PostUpdate(LoginRequiredMixin, UpdateView):
    model = Post
    template_name = 'blog/edit_post.html'
    fields = "__all__"
    success_url = reverse_lazy('home')

    def get_object(self, queryset=None):
        return get_object_or_404(Post, pk=self.kwargs.get('pk'))
