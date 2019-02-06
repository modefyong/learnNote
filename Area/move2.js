/**
 * Created by Administrator on 2019/2/3 0003.
 */

//完美运动框架！

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
function startMove(obj,json,fnEnd)
{
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {

        var bStop=true;//1.假设：所有值都已经到了

        for(var attr in json)
        {
            var cur = 0;
            if (attr == 'opacity') {
                cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);//Math.round() 四舍五入
            }
            else {
                cur = parseInt(getStyle(obj, attr));
            }
            var speed = (json[attr] - cur) / 6;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            if(cur!=json[attr])//2.只要有一个值不等于目标点，就false，假设不成立
                bStop=false;

            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
                obj.style.opacity = (cur + speed) / 100;
            }
            else {
                obj.style[attr] = cur + speed + 'px';
            }
        }
        if(bStop)//3.只有true时才关定时器
        {
            clearInterval(obj.timer);

            if(fnEnd)fnEnd();
        }
    }, 30);
}