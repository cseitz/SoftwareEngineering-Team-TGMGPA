% include("header.tpl")
% include("banner.tpl")
LOGIN

<div class="container">
   <div class="row">
      <div class='col-sm-6'>
         <div class="form-group">
            <div class='input-group date' id='datetimepicker1'>
               <input type='text' class="form-control" />
               <span class="input-group-addon">
               <span class="glyphicon glyphicon-calendar"></span>
               </span>
            </div>
         </div>
      </div>

   </div>
</div>

<div class='input-group date' id='datetimepicker2' style="width: 300px; float: right;">
  <input type='text' class="form-control" />
  <span class="input-group-addon">
  <span class="glyphicon glyphicon-calendar"></span>
  </span>
</div>

<script type="text/javascript">
   $(function () {
       $('#datetimepicker2').datetimepicker();
   });
</script>

% include("footer.tpl")
