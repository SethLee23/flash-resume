var result = `
/*面试官你好，我是xxx，很高兴参加这场面试，接下来，我将用代码来介绍自己，首先准备一些样式吧*/
/*加上过渡效果*/
*{
transition:all 0.3s;
}
/*背景颜色有些单调，先换个背景颜色吧*/

body{
background: rgb(0,43,54);
}
/*调整下格式*/
#codeInPre{
font-size:16px;
border:1px solid;
padding:0.5em;
margin:0.5em;
overflow:auto;
width:45vw;
height:90vh;
}

/*嗯，代码看着有点枯燥呢，加上代码高亮*/
.token.selector{
  color: #690;
}
.token.property{
  color: #905;
}
.token.function{
  color: #DD4A68;
}
.token.punctuation{
  color: #999;
}
.token.comment{
  color: slategray;
}

/*加上一点3d效果，有点紧张，我先喘口气*/
html{
  perspective: 1000px;
}
#codeInPre{
  animation: breath 0.5s infinite alternate-reverse;
  position: fixed;
  left:0;
  top:0;
  transition:none;
  transform: rotateY(10deg) translateZ(-100px); 
}

`
var result2 = `
#paper{
  position:fixed;
  right:0;
  width:50vw;
  height:90vh;
  display:flex; 
  justify-content:center;
  align-items:center;
  padding:16px;
      }
  #paper > #content{
  background:white;
  width:100%;
  height:100%;
  padding:2em;
  color:black;
  overflow: auto;
  }
  /*请看右边->*/
`
let markdown = `
# Angel
----
# 基本信息
----
民族： 汉
电话：18120561972
邮箱：sethlee.gmail.com
住址：湖北省宜昌市西陵区
身高：158cm
学历：本科
政治面貌：共青团员
出生年月：1995.08
毕业院校：武汉科技大学城市学院
# 教育背景
----
2013.09-2017.07  
武汉科技大学城市学院                     环境工程（本科）
主修课程：
物理化学、环境生态学、水污染控制、固体废物处理与处置、大气污染控制
、环境工程微生物学、环境工程原理、环境监测、水力学、工程制图等

# 实习经历
----
2016.09 -2016.12     武汉市洪山区疾控中心     实验操作员（实习生）
* 参与水质监测实验，提升实验操作技能
* 参与血样检测、高锰酸钾滴定等实验，学习操作流程，加强对实验精确性的要求。
2017.01 - 2017.05     宜昌市伍家岗区环保局     环境干事实习生
* 协助环保局干事赴工地进行现场勘测，对场地环境进行验收工作
* 参与对场地现场验收后，进行验收报告编写工作

# 工作经历
----
2017.07 -至今     
宜昌市伍家岗区大公桥街道办事处      社会事务办公室文体站干部
* 2019年3月，在自我岗位上，自谋其职，创新设立大公桥街道文体站抖音号
* 不断深入走访，征求辖区居民文化需求，从广告公司的策划、设计到参加活动
的人员，再到活动的对外宣传，全面运筹沟通，组织开展各类群众喜闻乐见的文化
活动。

`
var result3 = `
谢谢观看！`
writeCode('',result,()=>{createPaper(()=>{writeCode(result,result2,()=>{writeMarkdown(markdown,()=>{writeCode(result + result2,result3)})})})})


//功能函数
function writeCode(preCode,code,fn){
  let codeInPre = document.querySelector('#codeInPre')
  var n = 0
var timer = setInterval(()=>{
 n += 1
 preCode = preCode || ''
 codeInPre.innerHTML = Prism.highlight(preCode + code.slice(0,n), Prism.languages.css);
 codeInPre.scrollTop = 10000
  // codeInPre.innerHTML = Prism.highlight(result.slice(0,n), Prism.languages.css);
  styleTag.innerHTML = preCode + code.slice(0,n)
  if(n>=code.length){
      window.clearInterval(timer)
      //注意，异步结束才调用函数
      fn.call()
  }
  
},100)
}

function writeMarkdown(markdown,fn){
  let content = document.querySelector('#content')
  var n = 0
var timer = setInterval(()=>{
 n += 1
 content.innerHTML =  marked(markdown.slice(0,n));
 content.scrollTop = 10000
  // codeInPre.innerHTML = Prism.highlight(result.slice(0,n), Prism.languages.css);
  if(n>=markdown.length){
      window.clearInterval(timer)
      //注意，异步结束才调用函数
      fn.call()
  }
  
},100)
}

function createPaper(fn){
  var paper= document.createElement('div')
    paper.id = 'paper'
    var content = document.createElement('pre')
    content.id = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn.call()
}
