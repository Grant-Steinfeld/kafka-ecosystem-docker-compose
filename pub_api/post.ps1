# $body = @{user = @{email = "lost"; name = "coco"; id = "3333"} }
#$body = @{email = "lost"; name = "coco"; id = "3333"} 

#$jsonBody = ConvertTo-Json $body -Compress
#
#$j = {"user":{"name":"Coco6966","email":"love"}}
$jsonBody = @{title = "foo",body="foobar"}
Invoke-WebRequest -uri http://localhost:6060/posts -Method POST -Body $jsonBody 
