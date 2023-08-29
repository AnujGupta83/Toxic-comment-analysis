const x = document.getElementById("secondPage");
const y= document.getElementById("firstPage");
x.style.display = "none";
function itemcolor(result) {
    if(result == "positive"){
        return "list-group-item list-group-item-success";
    }
    else if(result == "negative"){
        return "list-group-item list-group-item-danger";
    }
    else{
        return "list-group-item list-group-item-warning";
    }
    
}
async function test() {
    
    const name= document.getElementById("accountName").value;
    let neg=0;
    let total=0;
    if (x.style.display === "none") {
        x.style.display = "block";
        y.style.display = "none";
    } else {
        x.style.display = "none";
        y.style.display = "block";
    }
    const userNameSpan= document.getElementById("userName");
    userNameSpan.innerHTML= name;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a7a6067abemsh80f9823d1e9df66p10e80cjsn81efec509c22',
            'X-RapidAPI-Host': 'instagram-scraper2.p.rapidapi.com'
        }
    };
    let response= await fetch(`https://instagram-scraper2.p.rapidapi.com/media_comments?short_code=${name}&batch_size=20`, options);
    let data= await response.json();
    console.log(data.data.shortcode_media.edge_media_to_parent_comment.edges);
    
    let list1="";
    for(let i=0;i<data.data.shortcode_media.edge_media_to_parent_comment.edges.length;i++){
        const text=data.data.shortcode_media.edge_media_to_parent_comment.edges[i].node.text;
        console.log(text);
        const body={
            "language": "english",
            "text": text
        };
        const options1 = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': 'a7a6067abemsh80f9823d1e9df66p10e80cjsn81efec509c22',
                'X-RapidAPI-Host': 'text-analysis12.p.rapidapi.com'
            },
            body: JSON.stringify(body)
        };
        let response2= await fetch("https://text-analysis12.p.rapidapi.com/sentiment-analysis/api/v1.1", options1);
        let data2= await response2.json();
        if(data2.sentiment == "negative"){
            neg++;
        }
        total++;
        list1+=`<li class="${itemcolor(data2.sentiment)}">${text}</li>`;
        
    }
    document.getElementById("comments").innerHTML=list1;
    document.getElementById("toxicity_level").innerHTML=(neg*100)/total;
    
    // fetch('https://instagram-scraper2.p.rapidapi.com/postcomment/Cklx2BIg1RG/%7Bend_cursor%7D', options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));
    
    // const options3 = {
    //     method: 'GET',
    //     headers: {
    //         'X-RapidAPI-Key': 'a7a6067abemsh80f9823d1e9df66p10e80cjsn81efec509c22',
    //         'X-RapidAPI-Host': 'instagram-scraper2.p.rapidapi.com'
    //     }
    // };
    // const userName= document.getElementById("userName").value;
    // // fetch(`https://instagram-scraper2.p.rapidapi.com/userinfo/${userName}`, options)
    // //     .then(response => response.json())
    // //     .then(response => console.log(response))
    // //     .catch(err => console.error(err));
    // //user id
    // let response3= await fetch(`https://instagram-scraper2.p.rapidapi.com/media_comments?short_code=${name}&batch_size=20`, options3);
    // let data3= await response3.json();
    // // console.log(data3);
    // let userID= data3.data.id;
    // // console.log(userID);
    // const options4 = {
    //     method: 'GET',
    //     headers: {
    //         'X-RapidAPI-Key': 'a7a6067abemsh80f9823d1e9df66p10e80cjsn81efec509c22',
    //         'X-RapidAPI-Host': 'instagram-scraper2.p.rapidapi.com'
    //     }
    // };
    
    // // fetch('https://instagram-scraper2.p.rapidapi.com/userpost/25025320/12/%7Bend_cursor%7D', options)
    // //     .then(response => response.json())
    // //     .then(response => console.log(response))
    // //     .catch(err => console.error(err));
    // //caption
    // let response4= await fetch(`https://instagram-scraper2.p.rapidapi.com/userpost/${userID}/12/%7Bend_cursor%7D`, options4);
    // let data4= await response4.json();
    // let list2="";
    // let neg2=0;
    // let total2=0;
    // for(let edge in data4.data.edges){
    //     // console.log(data4.data.edges[edge].node.edge_media_to_caption.edges[0].node.text);
    //     if(data4.data.edges[edge].node.edge_media_to_caption.edges){
    //         text=data4.data.edges[edge].node.edge_media_to_caption.edges[0].node.text;
    //     }
    //     else{
    //         text="no caption";
    //     }
    //     const body={
    //         "language": "english",
    //         "text": text
    //     };
    //     const options1 = {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json',
    //             'X-RapidAPI-Key': 'a7a6067abemsh80f9823d1e9df66p10e80cjsn81efec509c22',
    //             'X-RapidAPI-Host': 'text-analysis12.p.rapidapi.com'
    //         },
    //         body: JSON.stringify(body)
    //     };
    //     let response2= await fetch("https://text-analysis12.p.rapidapi.com/sentiment-analysis/api/v1.1", options1);
    //     let data2= await response2.json();
    //     if(data2.sentiment == "negative"){
    //         neg2++;
    //     }               
    //     total2++;
    //     list2+=`<li class="${itemcolor(data2.sentiment)}">${text}</li>`;
    // }
    // document.getElementById("captions").innerHTML=list2;
    // if(neg2>=total2/2){
    //     document.getElementById("caption_toxicity").innerHTML="Yes";
    // } else {
    //     document.getElementById("caption_toxicity").innerHTML="No";
    // }
    console.log("hhhh")
}

// post id=CknWUGVuWEn
// username= testnlp999