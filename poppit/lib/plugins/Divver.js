
function JSG_PropWalker(thing, which)
{
    if (!thing) return;
    for (var jj in thing)
    {
        if (which && (jj != which)) continue;
        console.log("prop " + jj + " = " + thing[jj]);
    }
}

function JSG_CreateDiv(id, html, width, height, left, top)
{
    var div = document.createElement('div');
    div.setAttribute('id', id);
    div.style.overflow = "scroll";
    div.style.width = width + "px";
    div.style.height = height + "px";

    var newId = id + 'Wrapper';
    // Shenanigans. The div above will contain the real content; the wrapper div is there to hide any scrollbar that appear.
    var wrapper = document.createElement('div');
    wrapper.setAttribute('id', newId);
    wrapper.style.overflow = "hidden";
    wrapper.style.width = (width) + "px";
    wrapper.style.height = (height - 20) + "px";
    wrapper.style.top = top + "px";
    wrapper.style.left = left + "px";
    wrapper.style.position = "absolute";
    wrapper.innerHTML = div.outerHTML;
    
    document.body.appendChild(wrapper);
    return newId;
}
