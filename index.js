const express=require('express');
const app=express();
const path=require('path');
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname,'public')));
app.use(methodOverride('_method'))

let posts=[{username:"harshik yadav",
   content:"gysdakfyudalgofyuawiyuweotyu",
   id:uuidv4(),
   image:'https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?cs=srgb&dl=pexels-padrinan-255379.jpg&fm=jpg'
},{username:"harshik yadav",
  content:"gysdakfyudalgofyuawiyuweotyu",
  id:uuidv4(),
  image:'https://t4.ftcdn.net/jpg/10/48/75/41/360_F_1048754142_Ps5yb6DiNHNTFB0BArgx0iFIdEK28WCU.jpg'
},{
  username:"React",
  content:"React is like a rebellious teenager—it doesn’t care about the DOM, just its **virtual** version. Components? Just glorified JavaScript functions that get angry when you mutate state directly. Hooks? A bunch of magic spells (`useState`, `useEffect`) that make class components obsolete. `useEffect` loves running twice in strict mode, just to mess with you. Props are sacred; mutate them, and React will judge you. JSX looks like HTML but is actually JavaScript in disguise. Also, `key` props? Forget them, and React will remind you—loudly. Finally, React is **fast**, but your app can still lag if you abuse re-renders. 🚀",
  id:uuidv4(),
  image:'https://media.istockphoto.com/id/1251141521/photo/nature-view-sunset-scenic-over-country-beautiful-country-road-at-famous-tuscany-landscape.webp?b=1&s=612x612&w=0&k=20&c=54QrfKh9qShHHsUrXbIC0avO1InrE3RxKflO2f_6Bh8='
},
{
  username:"React",
  content:"React is like a rebellious teenager—it doesn’t care about the DOM, just its **virtual** version. Components? Just glorified JavaScript functions that get angry when you mutate state directly. Hooks? A bunch of magic spells (`useState`, `useEffect`) that make class components obsolete. `useEffect` loves running twice in strict mode, just to mess with you. Props are sacred; mutate them, and React will judge you. JSX looks like HTML but is actually JavaScript in disguise. Also, `key` props? Forget them, and React will remind you—loudly. Finally, React is **fast**, but your app can still lag if you abuse re-renders. 🚀",
  id:uuidv4(),
  image:'https://static.vecteezy.com/system/resources/previews/006/240/302/non_2x/abstract-soft-focus-sunset-field-landscape-of-yellow-flowers-and-grass-meadow-warm-golden-hour-sunset-sunrise-time-tranquil-spring-summer-nature-closeup-and-blurred-forest-background-idyllic-nature-photo.jpg'
}
]

app.get('/posts',(req,res)=>{
    res.render('app.ejs',{data:posts});
})

app.post('/posts',(req,res)=>{
  let newdata={
    username:req.body.username,
    id:req.body.id,
    content:req.body.content,
    image:req.body.image
  }
  console.log(newdata);
  posts.push(newdata);
  // console.log(posts);
  res.redirect('/posts');
})

app.get('/create',(req,res)=>{
  res.render('edit',{id:uuidv4()});
})

app.get('/posts/:id',(req,res)=>{
   const id=req.params.id;
   let temp=null;
   for(let i of posts){
     if(i.id==id){
      temp=i;
      break;
     }
   }
  //  console.log(temp);
   res.render('show.ejs',{data:temp});
})

app.patch('/resource/:id',(req,res)=>{
  console.log('patch');
  const id=req.params.id;
  let change=posts.find((val)=>{
    return val.id==id;
  })
  // console.log()
  // console.log(req.body);
  change.content=req.body.content;
  change.username=req.body.username;

  res.redirect('/posts');
})

app.delete('/resource/:id',(req,res)=>{
  const id=req.params.id;
  posts=posts.filter((val)=>{
    return val.id!=id;
  })
  res.redirect('/posts');
})
app.get('*',(req,res)=>{
  res.redirect('/posts');
})
app.listen(3001);