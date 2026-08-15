/*
 * Game Controls
*/

function startInstructions(evt, jvinid, uid, username) {
  evt = (evt) ? evt : event;
  var mouseX = evt.screenX;
  var mouseY = evt.screenY;
  var w = 400;
  var h = 250;
  var x = mouseX - w + 100;
  var y = mouseY - h + 100;
  var features = "width=" + w + ",height=" + h
        + ",top=" + y + ",screenY=" + y
        + ",left=" + x + ",screenX=" + x;
  var url = "/themes/ydkj/instructions.php?jvinid=" + jvinid
    + "&uid=" + uid + "&username=" + username;
  var win = window.open(url, "Instruction", features);
}

function startShare(evt, jvinid, uid, email, username) {
  evt = (evt) ? evt : event;
  var mouseX = evt.screenX;
  var mouseY = evt.screenY;
  var w = 400;
  var h = 400;
  var x = mouseX - w + 100;
  var y = mouseY - h + 100;
  var features = "width=" + w + ",height=" + h
        + ",top=" + y + ",screenY=" + y
        + ",left=" + x + ",screenX=" + x;
  var url = "/themes/ydkj/share.php?jvinid=" + jvinid
    + "&uid=" + uid + "&email=" + email + "&username=" + username;
  var win = window.open(url, "Share", features);
}

function startEmbed(evt, jvin, jvit, uid, nid, embedScript) {
  evt = (evt) ? evt : event;
  var mouseX = evt.screenX;
  var mouseY = evt.screenY;
  var w = 730;
  var h = 300;
  var x = mouseX - w + 100;
  var y = mouseY - h + 100;
  var features = "width=" + w + ",height=" + h
        + ",top=" + y + ",screenY=" + y
        + ",left=" + x + ",screenX=" + x;
  var url = "/themes/ydkj/" + embedScript + ".php?jvin=" + jvin + "&jvit=" + jvit + "&u=" + uid + "&n=" + nid;
  var win = window.open(url, "Embed", features);
}

