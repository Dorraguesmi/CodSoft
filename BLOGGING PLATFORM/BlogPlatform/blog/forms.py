from django.forms import ModelForm
from .models import Post,Comment
from django import forms


class PostForm(ModelForm):
  class Meta :
    model = Post
    fields = ['title', 'description', 'type', 'image'] 
class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['content']

class LikeForm(forms.Form):
    post_id = forms.IntegerField()