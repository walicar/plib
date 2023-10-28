function onRequestPost(context) {
    return Response("nice", {
        "Set-Cookie": "coffee=good"
    })
}