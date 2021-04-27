% include("header.tpl")
% include("banner.tpl")
<form action="/api/login" method="post">
  <input type="email" name="email" placeholder="Email"><br>
  <input type="password" name="password" placeholder="Password"><br>
  <input type="submit" value="Login">
</form>
<a href="/register">Need to create an account?</a>
% include("footer.tpl")
