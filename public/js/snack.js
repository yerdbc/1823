// function sounima() {
//     let keyword = $('#soulingshi').val();
//     console.log(keyword)
//     $.ajax({
//         async: true,
//         url: "http://10.9.62.145:3000/admin/snack/getSnackByKw",
//         type: 'post', //请求的方式
//         data: {
//             keyword
//         }, //请求的数据
//         success: function (backdata) { //请求成功后返回的数据会封装在回调函数的第一个参数中
//             //通过backdata来获取所需要的数据

//             ('#sounima').click = getSnackByKw(backdata)
//         },
//         error: function (err) { //响应不成功时返回的函数
//             console.log('请求失败！')
//             console.log(err);

//         },
//         dataType: 'json' //设置返回的数据类型
//     })
// }





// function getSnackByKw(backdata) {
//     // console.log(backdata);

//     let data = backdata.data;

//     var snackL = "";
//     var totalM = data.length;
//     $('#totalM').html(totalM)


//     for (let index = 0; index < data.length; index++) {
//         // var msg = 

//         snackL +=
//             `<tr class="text-c">
//                 <td><input name="" type="checkbox" value=""></td>
//                 <td>${data[index].name}</td>
//                 <td>${data[index].brand}</td>
//                 <td><a href="javascript:;"><img src="http://10.9.62.145:3000${data[index].imgPath}" width="100" class="picture-thumb"
//                          ></a></td>
//                 <td class="text-l">${data[index].desc}</td>
//                 <td class="text-c">${data[index].weight}g</td>
//                 <td>${data[index].price}元</td>
//                 <td class="td-status"><span class="label label-success radius">已发布</span></td>
                
//                 <td class="td-manage"><a style="text-decoration:none" onClick="picture_stop(this,'10001')" href="javascript:;"
//                      title="下架"><i class="Hui-iconfont">&#xe6de;</i></a> 
                     
//                      <a style="text-decoration:none" class="ml-5" onClick="picture_edit('图库编辑','picture-add.html','10001')"
//                      href="javascript:;" title="编辑"><i class="Hui-iconfont">&#xe6df;</i></a> 
                     
//                      <a style="text-decoration:none" class="ml-5"
//                      onClick="picture_del(this,'10001')" href="javascript:;" title="删除"><i class="Hui-iconfont">&#xe6e2;</i></a>
//                 </td>
//             </tr>`
//     }

//     // var dataContent=document.getElementById('dataContent');
//     $('#tbody').html(snackL)
// }

let OL_Action_Root = 'http://10.9.62.145:3000'
let imgPath = ''

function addSnack() {
    // alert("刷新父级的时候会自动关闭弹层。")
    // 
    //添加新的食品信息
    let data = {
        name: $('#name').val(),
        price: $('#price').val(),
        imgPath: imgPath,
        desc: $('#desc').val(),
        brand: $('#brand').val(),
        weight: $('#weight').val()
    }
    $.post(OL_Action_Root + '/admin/snack/addSnack', data, (res) => {
        if (res.err === 0) {
            //关闭当前页面
            // layer_close()
            window.parent.location.reload();

        } else {
            // alert(res.msg)
        }
    })
}


function addPicture() {

    let file = $("#filewrap")[0].files[0] //在文件域中选中的图片
    console.log(file)
    var formData = new FormData() //创建一个空的formdata对象
    formData.append('hehe', file)
    $.ajax({
        url: OL_Action_Root + '/admin/upload/img',
        type: 'POST',
        data: formData,
        cache: false, //图片上传不要缓存
        contentType: false, // josn  urlecode
        processData: false, // 不需要jq进行默认格式处理
        success: function (data) {

            if (data.err == 0) {
                alert("上传成功")
                let imgurl = OL_Action_Root + data.data
                $('img').attr('src', imgurl)
                imgPath = data.data //获取图片的url信息
            } else {
                alert("上传失败")
            }
            console.log(data)
        }

    });
}





