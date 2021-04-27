% include("header.tpl")
% include("banner.tpl")
<form action="/api/login">
  <input type="email" name="email" placeholder="Email"><br>
  <input type="password" name="password" placeholder="Password"><br>
  <input type="submit" value="Login">
</form>
% include("footer.tpl")
