% include("header.tpl")
% include("banner.tpl")
<form action="/api/signup" method="post">
  <input type="text" name="name" placeholder="Name"><br>
  <input type="email" name="email" placeholder="Email"><br>
  <input type="password" name="password" placeholder="Password"><br>
  <input type="submit" value="Sign Up">
</form>
% include("footer.tpl")
