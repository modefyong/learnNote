/**
 * Created by Administrator on 2019/2/3 0003.
 */
/*该函数用于获取行间的样式
 * */
function getStyle(obj,name) {
    if(obj.currentStyle)
    {
        return obj.currentStyle[name];
    }
    else{
        return getComputedStyle(obj,false)[name];
    }
}
//var alpha = 30;多物体框架里所有东西都不能公用！

//任意值运动框架，封装函数
function startMove(obj,attr,iTarget,fnEnd)
{
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var cur=0;
        if(attr=='opacity'){
            cur=Math.round(parseFloat(getStyle(obj,attr))*100);//Math.round() 四舍五入
        }
        else{
            cur=parseInt(getStyle(obj,attr));
        }
        var speed = (iTarget - cur) / 6;
        speed=speed > 0 ? Math.ceil(speed) : Math.floor(speed);

        if (cur == iTarget)
        {
            clearInterval(obj.timer);
            if(fnEnd)fnEnd();
        }
        else
        {
            if(attr=='opacity')
            {
                obj.style.filter='alpha(opacity:'+(cur+speed)+')';
                obj.style.opacity=(cur+speed) /100;
            }
            else{
                obj.style[attr] = cur + speed + 'px';
            }

        }
    }, 30);
}