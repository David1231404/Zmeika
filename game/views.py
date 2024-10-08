from django.shortcuts import render

def startgame(request):
    return render(
        request,
        'game/snake.html'
    )

def mainpage(request):
    return render(
        request,
        'game/nGame.html'
    )