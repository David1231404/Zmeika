from django.shortcuts import render

def startgame(request):
    return render(
        request,
        'game/snake.html'
    )
