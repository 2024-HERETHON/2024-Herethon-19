from django.shortcuts import get_object_or_404, render, redirect
from django.http import JsonResponse, HttpResponseBadRequest
from .models import Review
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required

def create_review(request):
    if request.method == 'POST':
        user = request.user  # 로그인된 사용자
        content = request.POST.get('content', '')
        if content.strip():  # 내용이 비어 있지 않은지 확인
            review = Review.objects.create(user=user, content=content)
            return redirect('reviews:get_reviews', review_id=review.id)
        else:
            return render(request, 'reviews/create_review.html', {'error': 'Content cannot be empty'})
    return render(request, 'reviews/create_review.html', {'error': 'Content cannot be empty'})

def delete_review(request, review_id):
    review = get_object_or_404(Review, id=review_id)
    if request.user == review.user:
        review.delete()
        return redirect('reviews:get_reviews', review_id=review.id)
    else:
        return render(request, 'reviews/error.html', {'message': 'Unauthorized'}, status=403)

@login_required
def like(request, post_id):
    post = get_object_or_404(Review, id=post_id)
    if request.user in post.like_users.all():
        Review.like_users.remove(request.user)
    else:
        Review.like_users.add(request.user)


def get_reviews(request, review_id):
    review = get_object_or_404(Review, id=review_id)
    likes_count = review.likes.count()
    dislikes_count = review.dislikes.count()
    return render(request, 'reviews/get_reviews.html', {'review': review, 'likes_count': likes_count, 'dislikes_count': dislikes_count})
