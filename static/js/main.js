$(document).ready(function() {

    function func223() {
        console.log('wait')
        
        var one = $("#commentsessionslistdropdown").val();
        var two = $("#commentsectionlistdropdown").val();
        var three = $("#commentclasslistdropdown").val();
        var four = $("#commenttermlistdropdown").val();
        console.log(one, two, three, four)
        var allis2 = document.querySelectorAll('.psycresult2')
        for (let i=0; i<allis2.length; i++){
            
    
            var identityy = allis2[i].querySelector('input.stud_name_for_psyc').id;
            var stud_name = allis2[i].querySelector('input.stud_name_for_psyc').value;
            var teacher_comment = allis2[i].querySelector('input.stud_teacher_comment_for_psyc').value;
            var head_teacher_comment = allis2[i].querySelector('input.stud_head_teacher_comment_for_psyc').value;
            
            console.log(stud_name, teacher_comment, head_teacher_comment, identityy)
    
            $.ajax({
                type: "POST",
                url: `comment/submit/${identityy}/`,
                data: {
                    csrfmiddlewaretoken:csrftoken,
                    stud_name:stud_name,
                    session_name:one,
                    section_name:two,
                    class_name:three,
                    term_name:four,
                    teacher_comment:teacher_comment,
                    head_teacher_comment:head_teacher_comment,
                },
            
                success: function(response) {
                    document.querySelector(".tabs .tab-content .actives").scrollTo(top);
    
                    
    
                    
                }
            });
    
            
        }
    };
console.log('hello world')

    let tabHeaders = document.querySelectorAll(".tabs .tab-header > div");
    let tabContents = document.querySelectorAll(".tabs .tab-content > div");
    
    const newid = document.getElementById('selectsectionsubjects');

    const newid22 = document.getElementById('subjectssessionlistdropdown');
    const newid33 = document.getElementById('subjectsectionslistdropdown');
    const newid44 = document.getElementById('subjectclasslistdropdown');
    const newid55 = document.getElementById('subjecttermlistdropdown');
    

    const newid11 = document.getElementById('subjectslist');

    const newid66 = document.getElementById('termsubjectlist');
    
        
    for(let i=0;i<14;i++){
        console.log(tabHeaders[i])
        tabHeaders[i].addEventListener("click", function(){
            
            let ccc = document.querySelector(".tabs .tab-header > .actives");
                    
            let bbb = document.querySelector(".tabs .tab-content > .actives");
    
            console.log(ccc, bbb)
            
            document.querySelector(".tabs .tab-header > .actives").classList.remove("actives");
            tabHeaders[i].classList.add("actives");
            document.querySelector(".tabs .tab-content > .actives").classList.remove("actives");
            tabContents[i].classList.add("actives");
            

            
            
            
            $("#createsessionform")[0].reset();
            $("#createclassform")[0].reset();
            $("#createsectionform")[0].reset();
            newid.innerHTML = ""
            newid22.innerHTML = ""
            newid33.innerHTML = ""
            newid44.innerHTML = ""
            newid55.innerHTML = ""

            const newid2 = document.createElement('option');
            const newid3 = document.createElement('option');
            const newid4 = document.createElement('option');

            const subjectsessiondropdown = document.createElement('option');
            const subjectsectiondropdown = document.createElement('option');
            const subjectclassdropdown = document.createElement('option');
            const subjecttermdropdown = document.createElement('option');

            subjectsessiondropdown.textContent = "Choose a Session";
            subjectsessiondropdown.setAttribute('hidden', true);
            subjectsessiondropdown.setAttribute('selected', true);
            subjectsessiondropdown.setAttribute('disabled', true);

            subjectclassdropdown.textContent = "Choose a Class";
            subjectclassdropdown.setAttribute('hidden', true);
            subjectclassdropdown.setAttribute('selected', true);
            subjectclassdropdown.setAttribute('disabled', true);

            subjectsectiondropdown.textContent = "Choose a Section";
            subjectsectiondropdown.setAttribute('hidden', true);
            subjectsectiondropdown.setAttribute('selected', true);
            subjectsectiondropdown.setAttribute('disabled', true);

            subjecttermdropdown.textContent = "Choose a Term";
            subjecttermdropdown.setAttribute('hidden', true);
            subjecttermdropdown.setAttribute('selected', true);
            subjecttermdropdown.setAttribute('disabled', true);


            newid2.textContent = "Choose a Section";
            newid2.setAttribute('hidden', true);
            newid2.setAttribute('selected', true);
            newid2.setAttribute('disabled', true);

            newid3.textContent = "PRIMARY SECTION";
            newid3.setAttribute('id', 'primarysectionsubjects');
            newid3.setAttribute('value', 'PRIMARY SECTION');

            newid4.textContent = "NURSERY SECTION";
            newid4.setAttribute('id', 'nurserysectionsubjects');
            newid4.setAttribute('value', 'NURSERY SECTION');

            newid.appendChild(newid2)
            newid.appendChild(newid3)
            newid.appendChild(newid4)
            newid22.appendChild(subjectsessiondropdown)
            newid33.appendChild(subjectsectiondropdown)
            newid44.appendChild(subjectclassdropdown)
            newid55.appendChild(subjecttermdropdown)


            newid11.innerHTML = ""
            newid66.innerHTML = ""

            $.ajax({
                type:'GET',
                url: 'class/session/',
                success: function(response){
                    const sessiondropdown = document.getElementById('subjectssessionlistdropdown')
                    const sessionsdropdown = response.class_sessions_val
                    sessionsdropdown.map(item=>{
                        const option = document.createElement('option')
                        option.textContent = item.session_name
                        option.setAttribute('value', item.session_name)
                        option.setAttribute('id', item.id)
                        sessiondropdown.appendChild(option)
                    })
                },
                error: function(error){
                    console.log(error)
                }
            });
            
           
            $("#primresultform").remove();
            $('#primresulttitle').remove();
            $("#primary_result").prepend('<h2 id="primresulttitle">PRIMARY RESULT</h2><form action="" id="primresultform"><div class="row col-11"><select name="" id="resultsessionslistdropdown" class="col-5 ui dropdown form-control"><option value="" selected disabled hidden>Choose a Session</option></select><div class="col-2"></div><select name="" id="resultsectionlistdropdown" class="col-5 ui dropdown form-control"><option value="" selected disabled hidden>Choose a Section</option></select></div></br><div class="row col-11"><select name="" id="resultclasslistdropdown" class="col-5 ui dropdown form-control"><option value="" selected disabled hidden>Choose a Class</option></select><div class="col-2"></div><select name="" id="resulttermlistdropdown" class="col-5 ui dropdown form-control"><option value="" selected hidden disabled>Choose a Term</option></select></div></br><div class="row col-11"><select name="" id="resultsubjectlistdropdown" class="col-5 ui dropdown form-control"><option value="" selected disabled hidden>Choose a Subject</option></select></div></form>');



            $("#primresultsheetform").remove();
            $('#h2tgforprimsheet').remove();
            $("#primresultsheet").prepend('<h2 id="h2tgforprimsheet">PRIMARY RESULT SHEET</h2><form action="" id="primresultsheetform"><div class="row col-11"><select name="" id="resultsheetsessionslistdropdown" class="col-5 ui dropdown form-control"><option value="" selected disabled hidden>Choose a Session</option></select><div class="col-2"></div><select name="" id="resultsheetsectionlistdropdown" class="col-5 ui dropdown form-control"><option value="" selected disabled hidden>Choose a Section</option></select></div></br><div class="row col-11"><select name="" id="resultsheetclasslistdropdown" class="col-5 ui dropdown form-control"><option value="" selected disabled hidden>Choose a Class</option></select><div class="col-2"></div><select name="" id="resultsheettermlistdropdown" class="col-5 ui dropdown form-control"><option value="" selected hidden disabled>Choose a Term</option></select></div></br></form>');

            $("#nurresultsheetform").remove();
            $('#h2tgfornursheet').remove();
            $("#nurresultsheet").prepend('<h2 id="h2tgfornursheet">NURSERY RESULT SHEET</h2><form action="" id="nurresultsheetform"><div class="row col-11"><select name="" id="nurresultsheetsessionslistdropdown" class="col-5 ui dropdown form-control"><option value="" selected disabled hidden>Choose a Session</option></select><div class="col-2"></div><select name="" id="nurresultsheetsectionlistdropdown" class="col-5 ui dropdown form-control"><option value="" selected disabled hidden>Choose a Section</option></select></div></br><div class="row col-11"><select name="" id="nurresultsheetclasslistdropdown" class="col-5 ui dropdown form-control"><option value="" selected disabled hidden>Choose a Class</option></select><div class="col-2"></div><select name="" id="nurresultsheettermlistdropdown" class="col-5 ui dropdown form-control"><option value="" selected hidden disabled>Choose a Term</option></select></div></br><div class="row col-11"><select name="" id="nurresultsheetsubjectlistdropdown" class="col-5 ui dropdown form-control"><option value="" selected disabled hidden>Choose a Subject</option></select></div></form>');

            $("#primpsycform").remove();
            $('#h2tgforprimpsyc').remove();
            $("#primpsyc").prepend('<h2 id="h2tgforprimpsyc">PRIMARY PSYCHOMOTOR SKILLS</h2><form action="" id="primpsycform"><div class="row col-11"><select name="" id="primresultsessionslistdropdown" class="col-5 ui dropdown form-control"><option value="" selected disabled hidden>Choose a Session</option></select><div class="col-2"></div><select name="" id="primresultsectionlistdropdown" class="col-5 ui dropdown form-control"><option value="" selected disabled hidden>Choose a Section</option></select></div></br><div class="row col-11"><select name="" id="primresultclasslistdropdown" class="col-5 ui dropdown form-control"><option value="" selected disabled hidden>Choose a Class</option></select><div class="col-2"></div><select name="" id="primresulttermlistdropdown" class="col-5 ui dropdown form-control"><option value="" selected disabled hidden>Choose a Term</option></select></div></br><div class="row col-11"><select name="" id="primresultpsychomotorlistdropdown" class="col-5 ui dropdown form-control"><option value="" selected disabled hidden>Choose Psychomotor Skill</option></select></div></form>');


            $("#studentdetailsform").remove();
            $('#studentdetailstitle').remove();
            $("#studentdetails").prepend('<h2 id="studentdetailstitle">EDIT STUDENT DETAILS</h2><form action="" id="studentdetailsform"><div class="row col-11"><select name="" id="detailssessionslistdropdown" class="col-5 ui dropdown form-control"><option value="" selected disabled hidden>Choose a Session</option></select><div class="col-2"></div><select name="" id="detailssectionlistdropdown" class="col-5 ui dropdown form-control"><option value="" selected disabled hidden>Choose a Section</option></select></div></br><div class="row col-11"><select name="" id="detailsclasslistdropdown" class="col-5 ui dropdown form-control"><option value="" selected disabled hidden>Choose a Class</option></select><div class="col-2"></div></div></br></form>');

            $("#commentsinputform").remove();
            $('#commentsh2tg').remove();
            $("#commentsinput").prepend('<h2 id="commentsh2tg">HEADTEACHER AND TEACHERS COMMENTS</h2><form action="" id="commentsinputform"><div class="row col-11"><select name="" id="commentsessionslistdropdown" class="col-5 ui dropdown form-control"><option value="" selected disabled hidden>Choose a Session</option></select><div class="col-2"></div><select name="" id="commentsectionlistdropdown" class="col-5 ui dropdown form-control"><option value="" selected disabled hidden>Choose a Section</option></select></div></br><div class="row col-11"><select name="" id="commentclasslistdropdown" class="col-5 ui dropdown form-control"><option value="" selected disabled hidden>Choose a Class</option></select><div class="col-2"></div><select name="" id="commenttermlistdropdown" class="col-5 ui dropdown form-control"><option value="" selected disabled hidden>Choose a Term</option></select></div></br></form>')

            
            $("#nurseryresultform").remove();
            $('#nurresulttitle').remove();
            $("#nursery_result").prepend('<h2 id="nurresulttitle">NURSERY RESULT</h2><form action="" id="nurseryresultform"><div class="row col-11"><select name="" id="nurresultsessionslistdropdown" class="col-5 ui dropdown form-control"><option value="" selected disabled hidden>Choose a Session</option></select><div class="col-2"></div><select name="" id="nurresultsectionlistdropdown" class="col-5 ui dropdown form-control"><option value="" selected disabled hidden>Choose a Section</option></select></div></br><div class="row col-11"><select name="" id="nurresultclasslistdropdown" class="col-5 ui dropdown form-control"><option value="" selected disabled hidden>Choose a Class</option></select><div class="col-2"></div><select name="" id="nurresulttermlistdropdown" class="col-5 ui dropdown form-control"><option value="" selected disabled hidden>Choose a Term</option></select></div></br><div class="row col-11"><select name="" id="nurresultsubjectlistdropdown" class="col-5 ui dropdown form-control"><option value="" selected disabled hidden>Choose a Subject</option></select></div></form>')
            
            $('#nurresultlist2').remove();
            $('#commentlist2').remove();
            $('#studentdetailslist2').remove();

            $('#resultlist2').remove();
            $('#resultlist').append('<div id="resultlist2" class="resultlistlist2" ><div class="card"><div class="card-body"><form action="" class="row"><h5 class="col-4" style="margin-left: 20px!important;">STUDENT NAME</h5><h5 class="col-1" style="margin-left: 40px!important;">1ST CA</h5><h5 class="col-1" style="margin-left: 40px!important;">2ND CA</h5><h5 class="col-1" style="margin-left: 40px!important;">3RD CA</h1><h5 class="col-1" style="margin-left: 40px!important;">4TH CA</h5><h5 class="col-1" style="margin-left: 40px!important;">EXAM</h5></form></div></div><div class="newdiv" id="newdiv"></div></div>');
            
            $('#primpsyclist2').remove();
            $('#primpsyclist').append('<div id="primpsyclist2" class="primpsyclist2" ><div class="card"><div class="card-body"><form action="" class="row"><h5 class="col-5" style="margin-left: 20px!important;">STUDENT NAME</h5></form></div></div></div>');
            
            $('#pigpant').remove();
            $('#fishpant').prepend('<div id="pigpant"><h2>ADD STUDENTS</h2><form action="" autocomplete="new-form" class="studentform" id="createstudentform"><div class="row col-11"><select name="" id="studentsessionslistdropdown" class="col-5 ui dropdown form-control"><option value="" selected disabled hidden>Choose a Session</option></select><div class="col-2"></div><select name="" id="studentsectionlistdropdown" class="col-5 ui dropdown form-control"><option value="" selected disabled hidden>Choose a Section</option></select></div></br><div class="row col-11"><select name="" id="studentclasslistdropdown" class="col-5 ui dropdown form-control"><option value="" selected disabled hidden>Choose a Class</option></select><div class="col-2"></div><select name="" id="studenttermlistdropdown" class="col-5 ui dropdown form-control"><option value="" selected disabled hidden>Choose a Term</option></select></div></br><div class="row col-11"><input type="text" name="" id="studentfirstnameinput" placeholder="First name" class="col-3 ui dropdown form-control"><div class="col-1"></div><input type="text" name="" id="studentmiddlenameinput" placeholder="Middle name" class="col-3 ui dropdown form-control"><div class="col-1"></div><input type="text" name="" id="studentlastnameinput" placeholder="Last name" class="col-3 ui dropdown form-control"></div></br><div class="row col-11"><input type="text" name="" id="studentusernameinput" placeholder="Username" class="col-3 ui dropdown form-control"><div class="col-1"></div><select name="" id="studentgenderlistdropdown" class="col-3 ui dropdown form-control"><option value="Gender" selected disabled hidden>Gender</option><option value="Male">Male</option><option value="Female">Female</option></select><div class="col-1"></div><input type="date" name="" id="studentdateofbirthinput" class="col-3 ui dropdown form-control"></div></br><div class="row col-11"><input type="password" name="" id="studentpassword1" placeholder="Password" class="col-3 ui dropdown form-control" autocomplete="new-password"><input type="checkbox" onclick="myfunction22()" id="nnn" style="margin-left:10px;"><label for="nnn" style="padding-left:10px;">Show password</label><div class="col-1"></div><input type="password" name="" id="studentpassword2" placeholder="Confirm Password" class="col-3 ui dropdown form-control"><input type="checkbox" onclick="myfunction22b()" id="nnn1" style="margin-left:10px;"><label for="nnn1" style="padding-left:10px;">Show password</label></div></br><form action="" id="formdata" method="post" name="file_input"><input type="file" name="file_input" accept="image/png, image/jpeg" id="studentpassport" enctype="multipart/form-data" onchange="preview_image(event)"><br><hr><img id="display_img" style="max-height:210px;"/></form></form><br></div>')
            
            
    var resultsavebtn = $("input[name=psycsavebtn]")
    resultsavebtn.hide();
    const primpsycsubjectinput = document.getElementById('primresultpsychomotorlistdropdown');
    

    primpsycsubjectinput.addEventListener('change', e=>{
        
        console.log(e.target.value)
        const selected_resulsubjectinput1 = e.target.value
        const val = $('#primresultsessionslistdropdown').val();
        const val2 = $('#primresultsectionlistdropdown').val();
        const val3 = $('#primresultclasslistdropdown').val();
        const val4 = $('#primresulttermlistdropdown').val();
        console.log(val)
        $('#primpsyclist2').remove();
        
        
        

        $.ajax({
            type:'GET',
            url: `psychomotor/list/${selected_resulsubjectinput1}/${val}/${val2}/${val3}/${val4}/`,
            success: function(response){
                $('#primpsyclist').append('<div id="primpsyclist2" class="primpsyclist2" ><div class="card"><div class="card-body"><form action="" class="row"><h5 class="col-5" style="margin-left: 20px!important;">STUDENT NAME</h5></form></div></div><div id="newdivv" class="newdivv"></div></div>');
                var mydata = response.name
                var mydata1 = response.identity
                var mydata2 = response.data1
                var mydata3 = response.data2
                var mydata4 = response.data3
                var mydata5 = response.data4
                var mydata6 = response.data5
                var mydata7 = response.data6
                var mydata8 = response.data7
                var mydata9 = response.data8
                var mydata10 = response.data9
                var mydata11 = response.data10
                var mydata12 = response.data11
                var mydata13 = response.data12
                var mydata14 = response.data13
                var mydata15 = response.data14
                var mydata16 = response.data15
                for (x in mydata, mydata1, mydata2, mydata3, mydata4, mydata5, mydata6, mydata7, mydata8, mydata9, mydata10, mydata11, mydata12, mydata13, mydata14, mydata15, mydata16) {
                    console.log(mydata[x], mydata1[x], mydata2[x], mydata3[x], mydata4[x], mydata5[x], mydata6[x], mydata7[x], mydata8[x], mydata9[x], mydata10[x], mydata11[x], mydata12[x], mydata13[x], mydata14[x], mydata15[x], mydata16[x])
                    var fish = mydata[x];
                    var ten = mydata1[x];
                    var chicken = mydata2[x];
                    var fowl = mydata3[x];
                    var cow = mydata4[x];
                    var sheep = mydata5[x];
                    var goat = mydata6[x];
                    var snake = mydata7[x];
                    var one = mydata8[x];
                    var two = mydata9[x];
                    var three = mydata10[x];
                    var four = mydata11[x];
                    var five = mydata12[x];
                    var six = mydata13[x];
                    var seven = mydata14[x];
                    var eight = mydata15[x];
                    var nine = mydata16[x];
                for (y in fish); for (z in chicken); for (x in fowl); for (b in cow); for (c in sheep); for (d in goat); for (f in snake); for (g in one); for (h in two); for (j in three); for (k in four); for (l in five); for (m in six); for (n in seven); for (o in eight); for (p in nine); for (q in ten); {
                    console.log(fish[y], chicken[z], fowl[x], cow[b], sheep[c], goat[d], snake[f])
                    
                    $(".newdivv").append('<div class="card psycresult"><div class="card-body"><form action="" class="row"><input type="text" value="' + fish[y] + '" id="' + ten[q] + '" class="form-control col-5 stud_name" name="psycstudentname"><input type="radio" name="rolls_' + ten[q] + '" id="option_1_' + ten[q] + '" style="margin-left:60px!important;" value="A"><label for="option_1_' + ten[q] + '" style="padding-left:20px!important;">A</label><input type="radio" name="rolls_' + ten[q] + '" id="option_2_' + ten[q] + '" style="margin-left:60px!important;" value="B"><label for="option_2_' + ten[q] + '" style="padding-left:20px!important;">B</label><input type="radio" name="rolls_' + ten[q] + '" id="option_3_' + ten[q] + '" style="margin-left:60px!important;" value="C"><label for="option_3_' + ten[q] + '" style="padding-left:20px!important;">C</label><input type="radio" name="rolls_' + ten[q] + '" id="option_4_' + ten[q] + '" style="margin-left:60px!important;" value="D"><label for="option_4_' + ten[q] + '" style="padding-left:20px!important;">D</label><input type="radio" name="rolls_' + ten[q] + '" id="option_5_' + ten[q] + '" style="margin-left:60px!important;" value="E"><label for="option_5_' + ten[q] + '" style="padding-left:20px!important;">E</label></form></div></div>'); 
                    if (selected_resulsubjectinput1 == 'PUNCTUALITY') {
                        if (chicken[z] == 'A') {
                            document.getElementById('option_1_' + ten[q]).checked = true;
                        } else if (chicken[z] == 'B') {
                            document.getElementById('option_2_' + ten[q]).checked = true;
                        } else if (chicken[z] == 'C') {
                            document.getElementById('option_3_' + ten[q]).checked = true;
                        } else if (chicken[z] == 'D') {
                            document.getElementById('option_4_' + ten[q]).checked = true;
                        } else if (chicken[z] == 'E') {
                            document.getElementById('option_5_' + ten[q]).checked = true;
                        }
                    } else if (selected_resulsubjectinput1 == 'MENTAL ALERTNESS') {
                        if (fowl[x] == 'A') {
                            document.getElementById('option_1_' + ten[q]).checked = true;
                        } else if (fowl[x] == 'B') {
                            document.getElementById('option_2_' + ten[q]).checked = true;
                        } else if (fowl[x] == 'C') {
                            document.getElementById('option_3_' + ten[q]).checked = true;
                        } else if (fowl[x] == 'D') {
                            document.getElementById('option_4_' + ten[q]).checked = true;
                        } else if (fowl[x] == 'E') {
                            document.getElementById('option_5_' + ten[q]).checked = true;
                        }
                    } else if (selected_resulsubjectinput1 == 'RESPECT') {
                        if (cow[b] == 'A') {
                            document.getElementById('option_1_' + ten[q]).checked = true;
                        } else if (cow[b] == 'B') {
                            document.getElementById('option_2_' + ten[q]).checked = true;
                        } else if (cow[b] == 'C') {
                            document.getElementById('option_3_' + ten[q]).checked = true;
                        } else if (cow[b] == 'D') {
                            document.getElementById('option_4_' + ten[q]).checked = true;
                        } else if (cow[b] == 'E') {
                            document.getElementById('option_5_' + ten[q]).checked = true;
                        }
                    } else if (selected_resulsubjectinput1 == 'NEATNESS') {
                        if (sheep[c] == 'A') {
                            document.getElementById('option_1_' + ten[q]).checked = true;
                        } else if (sheep[c] == 'B') {
                            document.getElementById('option_2_' + ten[q]).checked = true;
                        } else if (sheep[c] == 'C') {
                            document.getElementById('option_3_' + ten[q]).checked = true;
                        } else if (sheep[c] == 'D') {
                            document.getElementById('option_4_' + ten[q]).checked = true;
                        } else if (sheep[c] == 'E') {
                            document.getElementById('option_5_' + ten[q]).checked = true;
                        }
                    } else if (selected_resulsubjectinput1 == 'POLITENESS') {
                        if (goat[d] == 'A') {
                            document.getElementById('option_1_' + ten[q]).checked = true;
                        } else if (goat[d] == 'B') {
                            document.getElementById('option_2_' + ten[q]).checked = true;
                        } else if (goat[d] == 'C') {
                            document.getElementById('option_3_' + ten[q]).checked = true;
                        } else if (goat[d] == 'D') {
                            document.getElementById('option_4_' + ten[q]).checked = true;
                        } else if (goat[d] == 'E') {
                            document.getElementById('option_5_' + ten[q]).checked = true;
                        }
                    } else if (selected_resulsubjectinput1 == 'HONESTY') {
                        if (snake[f] == 'A') {
                            document.getElementById('option_1_' + ten[q]).checked = true;
                        } else if (snake[f] == 'B') {
                            document.getElementById('option_2_' + ten[q]).checked = true;
                        } else if (snake[f] == 'C') {
                            document.getElementById('option_3_' + ten[q]).checked = true;
                        } else if (snake[f] == 'D') {
                            document.getElementById('option_4_' + ten[q]).checked = true;
                        } else if (snake[f] == 'E') {
                            document.getElementById('option_5_' + ten[q]).checked = true;
                        }
                    } else if (selected_resulsubjectinput1 == 'RELATIONSHIP WITH PEERS') {
                        if (one[g] == 'A') {
                            document.getElementById('option_1_' + ten[q]).checked = true;
                        } else if (one[g] == 'B') {
                            document.getElementById('option_2_' + ten[q]).checked = true;
                        } else if (one[g] == 'C') {
                            document.getElementById('option_3_' + ten[q]).checked = true;
                        } else if (one[g] == 'D') {
                            document.getElementById('option_4_' + ten[q]).checked = true;
                        } else if (one[g] == 'E') {
                            document.getElementById('option_5_' + ten[q]).checked = true;
                        }
                    } else if (selected_resulsubjectinput1 == 'WILLINGNESS TO LEARN') {
                        if (two[h] == 'A') {
                            document.getElementById('option_1_' + ten[q]).checked = true;
                        } else if (two[h] == 'B') {
                            document.getElementById('option_2_' + ten[q]).checked = true;
                        } else if (two[h] == 'C') {
                            document.getElementById('option_3_' + ten[q]).checked = true;
                        } else if (two[h] == 'D') {
                            document.getElementById('option_4_' + ten[q]).checked = true;
                        } else if (two[h] == 'E') {
                            document.getElementById('option_5_' + ten[q]).checked = true;
                        }
                    } else if (selected_resulsubjectinput1 == 'SPIRIT OF TEAMWORK') {
                        if (three[j] == 'A') {
                            document.getElementById('option_1_' + ten[q]).checked = true;
                        } else if (three[j] == 'B') {
                            document.getElementById('option_2_' + ten[q]).checked = true;
                        } else if (three[j] == 'C') {
                            document.getElementById('option_3_' + ten[q]).checked = true;
                        } else if (three[j] == 'D') {
                            document.getElementById('option_4_' + ten[q]).checked = true;
                        } else if (three[j] == 'E') {
                            document.getElementById('option_5_' + ten[q]).checked = true;
                        }
                    } else if (selected_resulsubjectinput1 == 'HEALTH') {
                        if (four[k] == 'A') {
                            document.getElementById('option_1_' + ten[q]).checked = true;
                        } else if (four[k] == 'B') {
                            document.getElementById('option_2_' + ten[q]).checked = true;
                        } else if (four[k] == 'C') {
                            document.getElementById('option_3_' + ten[q]).checked = true;
                        } else if (four[k] == 'D') {
                            document.getElementById('option_4_' + ten[q]).checked = true;
                        } else if (four[k] == 'E') {
                            document.getElementById('option_5_' + ten[q]).checked = true;
                        }
                    } else if (selected_resulsubjectinput1 == 'VERBAL SKILLS') {
                        if (five[l] == 'A') {
                            document.getElementById('option_1_' + ten[q]).checked = true;
                        } else if (five[l] == 'B') {
                            document.getElementById('option_2_' + ten[q]).checked = true;
                        } else if (five[l] == 'C') {
                            document.getElementById('option_3_' + ten[q]).checked = true;
                        } else if (five[l] == 'D') {
                            document.getElementById('option_4_' + ten[q]).checked = true;
                        } else if (five[l] == 'E') {
                            document.getElementById('option_5_' + ten[q]).checked = true;
                        }
                    } else if (selected_resulsubjectinput1 == 'PARTICIPATION IN GAMES & SPORTS') {
                        if (six[m] == 'A') {
                            document.getElementById('option_1_' + ten[q]).checked = true;
                        } else if (six[m] == 'B') {
                            document.getElementById('option_2_' + ten[q]).checked = true;
                        } else if (six[m] == 'C') {
                            document.getElementById('option_3_' + ten[q]).checked = true;
                        } else if (six[m] == 'D') {
                            document.getElementById('option_4_' + ten[q]).checked = true;
                        } else if (six[m] == 'E') {
                            document.getElementById('option_5_' + ten[q]).checked = true;
                        }
                    } else if (selected_resulsubjectinput1 == 'ARTISTIC CREATIVITY') {
                        if (seven[n] == 'A') {
                            document.getElementById('option_1_' + ten[q]).checked = true;
                        } else if (seven[n] == 'B') {
                            document.getElementById('option_2_' + ten[q]).checked = true;
                        } else if (seven[n] == 'C') {
                            document.getElementById('option_3_' + ten[q]).checked = true;
                        } else if (seven[n] == 'D') {
                            document.getElementById('option_4_' + ten[q]).checked = true;
                        } else if (seven[n] == 'E') {
                            document.getElementById('option_5_' + ten[q]).checked = true;
                        }
                    } else if (selected_resulsubjectinput1 == 'MUSICAL SKILLS') {
                        if (eight[o] == 'A') {
                            document.getElementById('option_1_' + ten[q]).checked = true;
                        } else if (eight[o] == 'B') {
                            document.getElementById('option_2_' + ten[q]).checked = true;
                        } else if (eight[o] == 'C') {
                            document.getElementById('option_3_' + ten[q]).checked = true;
                        } else if (eight[o] == 'D') {
                            document.getElementById('option_4_' + ten[q]).checked = true;
                        } else if (eight[o] == 'E') {
                            document.getElementById('option_5_' + ten[q]).checked = true;
                        }
                    } else if (selected_resulsubjectinput1 == 'DANCE SKILLS') {
                        if (nine[p] == 'A') {
                            document.getElementById('option_1_' + ten[q]).checked = true;
                        } else if (nine[p] == 'B') {
                            document.getElementById('option_2_' + ten[q]).checked = true;
                        } else if (nine[p] == 'C') {
                            document.getElementById('option_3_' + ten[q]).checked = true;
                        } else if (nine[p] == 'D') {
                            document.getElementById('option_4_' + ten[q]).checked = true;
                        } else if (nine[p] == 'E') {
                            document.getElementById('option_5_' + ten[q]).checked = true;
                        }
                    }
                }
                }
                
                var names = $("input[name=psycstudentname]")
                
                names.attr('readonly', true);
                $("input[name=psycsavebtn]").show();
                //resultsavebtn.show();
                
                
                
            },
            error: function(error){
                console.log(error)
            }
         });
    })





    $("#psycsavebtn").click(function() {
        
        var allis = document.querySelectorAll('.psycresult')
        var one = $("#primresultsessionslistdropdown").val();
        var two = $("#primresultsectionlistdropdown").val();
        var three = $("#primresultclasslistdropdown").val();
        var four = $("#primresulttermlistdropdown").val();
        var five = $("#primresultpsychomotorlistdropdown").val();
        console.log(one, two, three, four, five)
        for (let i=0; i<allis.length; i++){
            

            var identityy = allis[i].querySelector('input.stud_name').id;
            var seven = $("input[name='rolls_" + identityy + "']:checked").val();
            var subject_name = $('#primresultpsychomotorlistdropdown').val();
            var term_name = $('#primresulttermlistdropdown').val();
            console.log(seven, subject_name, term_name, identityy)

            $.ajax({
                type: "POST",
                url: `psycresult/update/${identityy}/`,
                data: {
                    csrfmiddlewaretoken:csrftoken,
                    subject_name:subject_name,
                    term_name:term_name,
                    psycoption:seven,
                },
            
                success: function(response) {
                    document.querySelector(".tabs .tab-content .actives").scrollTo(0, 220);

                    
  
                    
                }
            });

            
        }
        
    });
    
    

    

    $('#commentsavebtn').click(function() {
        console.log('wait')
        
        var one = $("#commentsessionslistdropdown").val();
        var two = $("#commentsectionlistdropdown").val();
        var three = $("#commentclasslistdropdown").val();
        var four = $("#commenttermlistdropdown").val();
        console.log(one, two, three, four)
        var allis2 = document.querySelectorAll('.psycresult2')
        for (let i=0; i<allis2.length; i++){
            

            var identityy = allis2[i].querySelector('input.stud_name_for_psyc').id;
            var stud_name = allis2[i].querySelector('input.stud_name_for_psyc').value;
            var teacher_comment = allis2[i].querySelector('input.stud_teacher_comment_for_psyc').value;
            var head_teacher_comment = allis2[i].querySelector('input.stud_head_teacher_comment_for_psyc').value;
            
            console.log(stud_name, teacher_comment, head_teacher_comment, identityy)

            $.ajax({
                type: "POST",
                url: `comment/submit/${identityy}/`,
                data: {
                    csrfmiddlewaretoken:csrftoken,
                    stud_name:stud_name,
                    session_name:one,
                    section_name:two,
                    class_name:three,
                    term_name:four,
                    teacher_comment:teacher_comment,
                    head_teacher_comment:head_teacher_comment,
                },
            
                success: function(response) {
                    document.querySelector(".tabs .tab-content .actives").scrollTo(top);

                    
  
                    
                }
            });

            
        }
    });

    const studdetailssessioninput = document.getElementById('detailssessionslistdropdown');
            const studentdetailssectioninput = document.getElementById('detailssectionlistdropdown');

            studdetailssessioninput.addEventListener('change', e=>{
            console.log(e.target.value)
            const selected_studdetailssessioninput = e.target.value
            
            studentdetailssectioninput.innerHTML = ""

            $.ajax({
                type:'GET',
                url: `subject/section/${selected_studdetailssessioninput}/`,
                success: function(response){
                    console.log(response.data2)
                    const option2 = document.createElement('option')
                    option2.textContent = "Choose a Section"
                    option2.setAttribute('hidden', true)
                    option2.setAttribute('selected', true)
                    option2.setAttribute('disabled', true)
                    studentdetailssectioninput.appendChild(option2)
                    const data = response.data2
                    data.map(item=>{
                        const option = document.createElement('option')
                        const option2 = document.createElement('option')
                        option.textContent = item.section_name
                        option2.textContent = "Choose a Section"
                        option.setAttribute('value', item.section_name)
                        option.setAttribute('id', item.id)
                        option2.setAttribute('hidden', true)
                        option2.setAttribute('selected', true)
                        option2.setAttribute('disabled', true)
                        studentdetailssectioninput.appendChild(option)
                        studentdetailssectioninput.appendChild(option2)
                    })
                    
                },
                error: function(error){
                    console.log(error)
                }
            });
        })

        const studentdetailssectioninput1 = document.getElementById('detailssectionlistdropdown');
        const studentdetailsclassinput = document.getElementById('detailsclasslistdropdown');
    
        studentdetailssectioninput1.addEventListener('change', e=>{
            console.log(e.target.value)
            const selected_studentdetailssectioninput1 = e.target.value
            const val = $('#detailssessionslistdropdown').val();
            console.log(val)
            
            studentdetailsclassinput.innerHTML = ""
    
            $.ajax({
                type:'GET',
                url: `subject/class/${selected_studentdetailssectioninput1}/${val}/`,
                success: function(response){
                    console.log(response.data3)
                    const option2 = document.createElement('option')
                    option2.textContent = "Choose a Class"
                    option2.setAttribute('hidden', true)
                    option2.setAttribute('selected', true)
                    option2.setAttribute('disabled', true)
                    studentdetailsclassinput.appendChild(option2)
                    const data = response.data3
                    data.map(item=>{
                        const option = document.createElement('option')
                        const option2 = document.createElement('option')
                        option.textContent = item.class_name
                        option2.textContent = "Choose a Class"
                        option.setAttribute('value', item.class_name)
                        option.setAttribute('id', item.id)
                        option2.setAttribute('hidden', true)
                        option2.setAttribute('selected', true)
                        option2.setAttribute('disabled', true)
                        studentdetailsclassinput.appendChild(option)
                        studentdetailsclassinput.appendChild(option2)
                    })
                    
                },
                error: function(error){
                    console.log(error)
                }
             });
        })

        const studentdetailsclassinpu1 = document.getElementById('detailsclasslistdropdown');

        studentdetailsclassinpu1.addEventListener('change', e=>{
            const selected_studentdetailsclassinpu1 = e.target.value
            var one = $('#detailssessionslistdropdown').val();
            var two = $('#detailssectionlistdropdown').val();
            console.log(one, two, selected_studentdetailsclassinpu1)
            $('#studentdetailslist2').remove();

            $.ajax({
                type:'POST',
                url:'studentdetails/update/',
                data: {
                    csrfmiddlewaretoken:csrftoken,
                    session_name:one,
                    section_name:two,
                    class_name:selected_studentdetailsclassinpu1,
                },
                success: function(response){
                    $('#studentdetailslist').append('<div id="studentdetailslist2" class="studentdetailslist2" ><div id="studdetails1" class="studdetails1"></div></div>');
                    console.log(response.identity, response.stud_name)
                    for (x in response.identity, response.stud_name) {
                        for (a in response.identity[x]); for (b in response.stud_name[x]); {
                            $('#studdetails1').append('<div class="card studdetails"><div class="card-body"><div class="row"><input type="text" class="form-control studdetailsname col-5" value="' + response.stud_name[x][b] + '" id="' + response.identity[x][a] + '" name="comment_stud_name" style="padding-right:50px!important;"><div class="col-4"></div><a href="/student/details/edit/' + response.identity[x][a] + '"><input type="button" class="btn btn-outline-primary stud_submit_btn" value="EDIT" id="' + response.identity[x][a] + '" name="stud_submit_btn"></a></div></div></div>')
                            $('input[name=comment_stud_name]').attr('readonly', true);
                        }
                    }
                    
                }
            });
        })

        //stud_submit_btn
        // $("#studentdetailslist").on('click', '.stud_submit_btn', function() {
        //     var one = this.id;
        //     console.log(one)
        //     $.ajax({
        //         type:'POST',
        //         url:"student/details/edit/",
        //         data: {
        //             identity:one,
        //             csrfmiddlewaretoken:csrftoken,
        //         },
        //         success: function(){
        //             window.location.href = "/student/details/edit/";
        //         }
        //     });
        // });




























            const studpsycsessioninput = document.getElementById('primresultsessionslistdropdown');
            const studpsycsectioninput = document.getElementById('primresultsectionlistdropdown');

            studpsycsessioninput.addEventListener('change', e=>{
            console.log(e.target.value)
            const selected_studpsycsessioninput = e.target.value
            
            studpsycsectioninput.innerHTML = ""

            $.ajax({
                type:'GET',
                url: `subject/section/${selected_studpsycsessioninput}/`,
                success: function(response){
                    console.log(response.data2)
                    const option2 = document.createElement('option')
                    option2.textContent = "Choose a Section"
                    option2.setAttribute('hidden', true)
                    option2.setAttribute('selected', true)
                    option2.setAttribute('disabled', true)
                    studpsycsectioninput.appendChild(option2)
                    const data = response.data2
                    data.map(item=>{
                        const option = document.createElement('option')
                        const option2 = document.createElement('option')
                        option.textContent = item.section_name
                        option2.textContent = "Choose a Section"
                        option.setAttribute('value', item.section_name)
                        option.setAttribute('id', item.id)
                        option2.setAttribute('hidden', true)
                        option2.setAttribute('selected', true)
                        option2.setAttribute('disabled', true)
                        studpsycsectioninput.appendChild(option)
                        studpsycsectioninput.appendChild(option2)
                    })
                    
                },
                error: function(error){
                    console.log(error)
                }
            });
        })
            

        const studcommentsessioninput = document.getElementById('commentsessionslistdropdown');
            const studcommentsectioninput = document.getElementById('commentsectionlistdropdown');

            studcommentsessioninput.addEventListener('change', e=>{
            console.log(e.target.value)
            const selected_studcommentsessioninput = e.target.value
            
            studcommentsectioninput.innerHTML = ""

            $.ajax({
                type:'GET',
                url: `subject/section/${selected_studcommentsessioninput}/`,
                success: function(response){
                    console.log(response.data2)
                    const option2 = document.createElement('option')
                    option2.textContent = "Choose a Section"
                    option2.setAttribute('hidden', true)
                    option2.setAttribute('selected', true)
                    option2.setAttribute('disabled', true)
                    studcommentsectioninput.appendChild(option2)
                    const data = response.data2
                    data.map(item=>{
                        const option = document.createElement('option')
                        const option2 = document.createElement('option')
                        option.textContent = item.section_name
                        option2.textContent = "Choose a Section"
                        option.setAttribute('value', item.section_name)
                        option.setAttribute('id', item.id)
                        option2.setAttribute('hidden', true)
                        option2.setAttribute('selected', true)
                        option2.setAttribute('disabled', true)
                        studcommentsectioninput.appendChild(option)
                        studcommentsectioninput.appendChild(option2)
                    })
                    
                },
                error: function(error){
                    console.log(error)
                }
            });
        })



        const primresultsessioninput = document.getElementById('resultsheetsessionslistdropdown');
            const primresultsectioninput = document.getElementById('resultsheetsectionlistdropdown');

            primresultsessioninput.addEventListener('change', e=>{
            console.log(e.target.value)
            const selected_primresultsessioninput = e.target.value
            
            primresultsectioninput.innerHTML = ""

            $.ajax({
                type:'GET',
                url: `subject/section/${selected_primresultsessioninput}/`,
                success: function(response){
                    console.log(response.data2)
                    const option2 = document.createElement('option')
                    option2.textContent = "Choose a Section"
                    option2.setAttribute('hidden', true)
                    option2.setAttribute('selected', true)
                    option2.setAttribute('disabled', true)
                    primresultsectioninput.appendChild(option2)
                    const data = response.data2
                    data.map(item=>{
                        const option = document.createElement('option')
                        const option2 = document.createElement('option')
                        option.textContent = item.section_name
                        option2.textContent = "Choose a Section"
                        option.setAttribute('value', item.section_name)
                        option.setAttribute('id', item.id)
                        option2.setAttribute('hidden', true)
                        option2.setAttribute('selected', true)
                        option2.setAttribute('disabled', true)
                        primresultsectioninput.appendChild(option)
                        primresultsectioninput.appendChild(option2)
                    })
                    
                },
                error: function(error){
                    console.log(error)
                }
            });
        })


        const nurresultsessioninput = document.getElementById('nurresultsheetsessionslistdropdown');
            const nurresultsectioninput = document.getElementById('nurresultsheetsectionlistdropdown');

            nurresultsessioninput.addEventListener('change', e=>{
            console.log(e.target.value)
            const selected_nurresultsessioninput = e.target.value
            
            nurresultsectioninput.innerHTML = ""

            $.ajax({
                type:'GET',
                url: `subject/section/${selected_nurresultsessioninput}/`,
                success: function(response){
                    console.log(response.data2)
                    const option2 = document.createElement('option')
                    option2.textContent = "Choose a Section"
                    option2.setAttribute('hidden', true)
                    option2.setAttribute('selected', true)
                    option2.setAttribute('disabled', true)
                    nurresultsectioninput.appendChild(option2)
                    const data = response.data2
                    data.map(item=>{
                        const option = document.createElement('option')
                        const option2 = document.createElement('option')
                        option.textContent = item.section_name
                        option2.textContent = "Choose a Section"
                        option.setAttribute('value', item.section_name)
                        option.setAttribute('id', item.id)
                        option2.setAttribute('hidden', true)
                        option2.setAttribute('selected', true)
                        option2.setAttribute('disabled', true)
                        nurresultsectioninput.appendChild(option)
                        nurresultsectioninput.appendChild(option2)
                    })
                    
                },
                error: function(error){
                    console.log(error)
                }
            });
        })

        const studpsycsectioninput1 = document.getElementById('primresultsectionlistdropdown');
    const studpsycclassinput = document.getElementById('primresultclasslistdropdown');

    studpsycsectioninput1.addEventListener('change', e=>{
        console.log(e.target.value)
        const selected_studpsycsectioninput1 = e.target.value
        const val = $('#primresultsessionslistdropdown').val();
        console.log(val)
        
        studpsycclassinput.innerHTML = ""

        $.ajax({
            type:'GET',
            url: `subject/class/${selected_studpsycsectioninput1}/${val}/`,
            success: function(response){
                console.log(response.data3)
                const option2 = document.createElement('option')
                option2.textContent = "Choose a Class"
                option2.setAttribute('hidden', true)
                option2.setAttribute('selected', true)
                option2.setAttribute('disabled', true)
                studpsycclassinput.appendChild(option2)
                const data = response.data3
                data.map(item=>{
                    const option = document.createElement('option')
                    const option2 = document.createElement('option')
                    option.textContent = item.class_name
                    option2.textContent = "Choose a Class"
                    option.setAttribute('value', item.class_name)
                    option.setAttribute('id', item.id)
                    option2.setAttribute('hidden', true)
                    option2.setAttribute('selected', true)
                    option2.setAttribute('disabled', true)
                    studpsycclassinput.appendChild(option)
                    studpsycclassinput.appendChild(option2)
                })
                
            },
            error: function(error){
                console.log(error)
            }
         });
    })


    const studcommentsectioninput1 = document.getElementById('commentsectionlistdropdown');
    const studcommentclassinput = document.getElementById('commentclasslistdropdown');

    studcommentsectioninput1.addEventListener('change', e=>{
        console.log(e.target.value)
        const selected_studcommentsectioninput1 = e.target.value
        const val = $('#commentsessionslistdropdown').val();
        console.log(val)
        
        studcommentclassinput.innerHTML = ""

        $.ajax({
            type:'GET',
            url: `subject/class/${selected_studcommentsectioninput1}/${val}/`,
            success: function(response){
                console.log(response.data3)
                const option2 = document.createElement('option')
                option2.textContent = "Choose a Class"
                option2.setAttribute('hidden', true)
                option2.setAttribute('selected', true)
                option2.setAttribute('disabled', true)
                studcommentclassinput.appendChild(option2)
                const data = response.data3
                data.map(item=>{
                    const option = document.createElement('option')
                    const option2 = document.createElement('option')
                    option.textContent = item.class_name
                    option2.textContent = "Choose a Class"
                    option.setAttribute('value', item.class_name)
                    option.setAttribute('id', item.id)
                    option2.setAttribute('hidden', true)
                    option2.setAttribute('selected', true)
                    option2.setAttribute('disabled', true)
                    studcommentclassinput.appendChild(option)
                    studcommentclassinput.appendChild(option2)
                })
                
            },
            error: function(error){
                console.log(error)
            }
         });
    })


    const primresultsectioninput1 = document.getElementById('resultsheetsectionlistdropdown');
    const primresultclassinput = document.getElementById('resultsheetclasslistdropdown');

    primresultsectioninput1.addEventListener('change', e=>{
        console.log(e.target.value)
        const selected_primresultsectioninput1 = e.target.value
        const val = $('#resultsheetsessionslistdropdown').val();
        console.log(val)
        
        primresultclassinput.innerHTML = ""

        $.ajax({
            type:'GET',
            url: `subject/class/${selected_primresultsectioninput1}/${val}/`,
            success: function(response){
                console.log(response.data3)
                const option2 = document.createElement('option')
                option2.textContent = "Choose a Class"
                option2.setAttribute('hidden', true)
                option2.setAttribute('selected', true)
                option2.setAttribute('disabled', true)
                primresultclassinput.appendChild(option2)
                const data = response.data3
                data.map(item=>{
                    const option = document.createElement('option')
                    const option2 = document.createElement('option')
                    option.textContent = item.class_name
                    option2.textContent = "Choose a Class"
                    option.setAttribute('value', item.class_name)
                    option.setAttribute('id', item.id)
                    option2.setAttribute('hidden', true)
                    option2.setAttribute('selected', true)
                    option2.setAttribute('disabled', true)
                    primresultclassinput.appendChild(option)
                    primresultclassinput.appendChild(option2)
                })
                
            },
            error: function(error){
                console.log(error)
            }
         });
    })

    const nurresultsectioninput2 = document.getElementById('nurresultsheetsectionlistdropdown');
    const nurresultclassinput = document.getElementById('nurresultsheetclasslistdropdown');

    nurresultsectioninput2.addEventListener('change', e=>{
        console.log(e.target.value)
        const selected_nurresultsectioninput2 = e.target.value
        const val = $('#nurresultsheetsessionslistdropdown').val();
        console.log(val)
        
        nurresultclassinput.innerHTML = ""

        $.ajax({
            type:'GET',
            url: `subject/class/${selected_nurresultsectioninput2}/${val}/`,
            success: function(response){
                console.log(response.data3)
                const option2 = document.createElement('option')
                option2.textContent = "Choose a Class"
                option2.setAttribute('hidden', true)
                option2.setAttribute('selected', true)
                option2.setAttribute('disabled', true)
                nurresultclassinput.appendChild(option2)
                const data = response.data3
                data.map(item=>{
                    const option = document.createElement('option')
                    const option2 = document.createElement('option')
                    option.textContent = item.class_name
                    option2.textContent = "Choose a Class"
                    option.setAttribute('value', item.class_name)
                    option.setAttribute('id', item.id)
                    option2.setAttribute('hidden', true)
                    option2.setAttribute('selected', true)
                    option2.setAttribute('disabled', true)
                    nurresultclassinput.appendChild(option)
                    nurresultclassinput.appendChild(option2)
                })
                
            },
            error: function(error){
                console.log(error)
            }
         });
    })

    const studpsycclassinput1 = document.getElementById('primresultclasslistdropdown');
    const studpsycterminput = document.getElementById('primresulttermlistdropdown');

    studpsycclassinput1.addEventListener('change', e=>{
        console.log(e.target.value)
        
        studpsycterminput.innerHTML = ""

        const option2 = document.createElement('option')
        option2.textContent = "Choose a Term"
        option2.setAttribute('hidden', true)
        option2.setAttribute('selected', true)
        option2.setAttribute('disabled', true)
        studpsycterminput.appendChild(option2)

        const option = document.createElement('option')
        option.textContent = 'FIRST TERM'
        option.setAttribute('value', 'FIRST TERM')
        option.setAttribute('id', '')
        studpsycterminput.appendChild(option)

        const option3 = document.createElement('option')
        option3.textContent = 'SECOND TERM'
        option3.setAttribute('value', 'SECOND TERM')
        option3.setAttribute('id', '')
        studpsycterminput.appendChild(option3)

        const option4 = document.createElement('option')
        option4.textContent = 'THIRD TERM'
        option4.setAttribute('value', 'THIRD TERM')
        option4.setAttribute('id', '')
        studpsycterminput.appendChild(option4)

       
    })

    const studcommentclassinput1 = document.getElementById('commentclasslistdropdown');
    const studcommentterminput = document.getElementById('commenttermlistdropdown');

    studcommentclassinput1.addEventListener('change', e=>{
        console.log(e.target.value)
        
        studcommentterminput.innerHTML = ""

        const option2 = document.createElement('option')
        option2.textContent = "Choose a Term"
        option2.setAttribute('hidden', true)
        option2.setAttribute('selected', true)
        option2.setAttribute('disabled', true)
        studcommentterminput.appendChild(option2)

        const option = document.createElement('option')
        option.textContent = 'FIRST TERM'
        option.setAttribute('value', 'FIRST TERM')
        option.setAttribute('id', '')
        studcommentterminput.appendChild(option)

        const option3 = document.createElement('option')
        option3.textContent = 'SECOND TERM'
        option3.setAttribute('value', 'SECOND TERM')
        option3.setAttribute('id', '')
        studcommentterminput.appendChild(option3)

        const option4 = document.createElement('option')
        option4.textContent = 'THIRD TERM'
        option4.setAttribute('value', 'THIRD TERM')
        option4.setAttribute('id', '')
        studcommentterminput.appendChild(option4)

       
    })


    const primresultclassinput1 = document.getElementById('resultsheetclasslistdropdown');
    const primresultterminput = document.getElementById('resultsheettermlistdropdown');

    primresultclassinput1.addEventListener('change', e=>{
        console.log(e.target.value)
        
        primresultterminput.innerHTML = ""

        const option2 = document.createElement('option')
        option2.textContent = "Choose a Term"
        option2.setAttribute('hidden', true)
        option2.setAttribute('selected', true)
        option2.setAttribute('disabled', true)
        primresultterminput.appendChild(option2)

        const option = document.createElement('option')
        option.textContent = 'FIRST TERM'
        option.setAttribute('value', 'FIRST TERM')
        option.setAttribute('id', '')
        primresultterminput.appendChild(option)

        const option3 = document.createElement('option')
        option3.textContent = 'SECOND TERM'
        option3.setAttribute('value', 'SECOND TERM')
        option3.setAttribute('id', '')
        primresultterminput.appendChild(option3)

        const option4 = document.createElement('option')
        option4.textContent = 'THIRD TERM'
        option4.setAttribute('value', 'THIRD TERM')
        option4.setAttribute('id', '')
        primresultterminput.appendChild(option4)

       
    })


    const nurresultclassinput2 = document.getElementById('nurresultsheetclasslistdropdown');
    const nurresultterminput = document.getElementById('nurresultsheettermlistdropdown');

    nurresultclassinput2.addEventListener('change', e=>{
        console.log(e.target.value)
        
        nurresultterminput.innerHTML = ""

        const option2 = document.createElement('option')
        option2.textContent = "Choose a Term"
        option2.setAttribute('hidden', true)
        option2.setAttribute('selected', true)
        option2.setAttribute('disabled', true)
        nurresultterminput.appendChild(option2)

        const option = document.createElement('option')
        option.textContent = 'FIRST TERM'
        option.setAttribute('value', 'FIRST TERM')
        option.setAttribute('id', '')
        nurresultterminput.appendChild(option)

        const option3 = document.createElement('option')
        option3.textContent = 'SECOND TERM'
        option3.setAttribute('value', 'SECOND TERM')
        option3.setAttribute('id', '')
        nurresultterminput.appendChild(option3)

        const option4 = document.createElement('option')
        option4.textContent = 'THIRD TERM'
        option4.setAttribute('value', 'THIRD TERM')
        option4.setAttribute('id', '')
        nurresultterminput.appendChild(option4)

       
    })


    const studpsycterminput1 = document.getElementById('primresulttermlistdropdown');
    const studpsycsubjectinput = document.getElementById('primresultpsychomotorlistdropdown');

    studpsycterminput1.addEventListener('change', e=>{
        console.log(e.target.value)
        
        studpsycsubjectinput.innerHTML = ""

        const option2 = document.createElement('option')
        option2.textContent = "Choose Psychomotor Skill"
        option2.setAttribute('hidden', true)
        option2.setAttribute('selected', true)
        option2.setAttribute('disabled', true)
        studpsycsubjectinput.appendChild(option2)

        const option = document.createElement('option')
        option.textContent = 'PUNCTUALITY'
        option.setAttribute('value', 'PUNCTUALITY')
        option.setAttribute('id', '')
        studpsycsubjectinput.appendChild(option)

        const option3 = document.createElement('option')
        option3.textContent = 'MENTAL ALERTNESS'
        option3.setAttribute('value', 'MENTAL ALERTNESS')
        option3.setAttribute('id', '')
        studpsycsubjectinput.appendChild(option3)

        const option4 = document.createElement('option')
        option4.textContent = 'RESPECT'
        option4.setAttribute('value', 'RESPECT')
        option4.setAttribute('id', '')
        studpsycsubjectinput.appendChild(option4)

        const option5 = document.createElement('option')
        option5.textContent = 'NEATNESS'
        option5.setAttribute('value', 'NEATNESS')
        option5.setAttribute('id', '')
        studpsycsubjectinput.appendChild(option5)

        const option6 = document.createElement('option')
        option6.textContent = 'POLITENESS'
        option6.setAttribute('value', 'POLITENESS')
        option6.setAttribute('id', '')
        studpsycsubjectinput.appendChild(option6)

        const option7 = document.createElement('option')
        option7.textContent = 'HONESTY'
        option7.setAttribute('value', 'HONESTY')
        option7.setAttribute('id', '')
        studpsycsubjectinput.appendChild(option7)

        const option8 = document.createElement('option')
        option8.textContent = 'RELATIONSHIP WITH PEERS'
        option8.setAttribute('value', 'RELATIONSHIP WITH PEERS')
        option8.setAttribute('id', '')
        studpsycsubjectinput.appendChild(option8)

        const option9 = document.createElement('option')
        option9.textContent = 'WILLINGNESS TO LEARN'
        option9.setAttribute('value', 'WILLINGNESS TO LEARN')
        option9.setAttribute('id', '')
        studpsycsubjectinput.appendChild(option9)

        const option10 = document.createElement('option')
        option10.textContent = 'SPIRIT OF TEAMWORK'
        option10.setAttribute('value', 'SPIRIT OF TEAMWORK')
        option10.setAttribute('id', '')
        studpsycsubjectinput.appendChild(option10)

        const option11 = document.createElement('option')
        option11.textContent = 'HEALTH'
        option11.setAttribute('value', 'HEALTH')
        option11.setAttribute('id', '')
        studpsycsubjectinput.appendChild(option11)

        const option12 = document.createElement('option')
        option12.textContent = 'VERBAL SKILLS'
        option12.setAttribute('value', 'VERBAL SKILLS')
        option12.setAttribute('id', '')
        studpsycsubjectinput.appendChild(option12)

        const option13 = document.createElement('option')
        option13.textContent = 'PARTICIPATION IN GAMES & SPORTS'
        option13.setAttribute('value', 'PARTICIPATION IN GAMES & SPORTS')
        option13.setAttribute('id', '')
        studpsycsubjectinput.appendChild(option13)

        const option14 = document.createElement('option')
        option14.textContent = 'ARTISTIC CREATIVITY'
        option14.setAttribute('value', 'ARTISTIC CREATIVITY')
        option14.setAttribute('id', '')
        studpsycsubjectinput.appendChild(option14)

        const option15 = document.createElement('option')
        option15.textContent = 'MUSICAL SKILLS'
        option15.setAttribute('value', 'MUSICAL SKILLS')
        option15.setAttribute('id', '')
        studpsycsubjectinput.appendChild(option15)

        const option16 = document.createElement('option')
        option16.textContent = 'DANCE SKILLS'
        option16.setAttribute('value', 'DANCE SKILLS')
        option16.setAttribute('id', '')
        studpsycsubjectinput.appendChild(option16)

       
    })


    


            
    $('#commentsavebtn').hide();
    const studcommentterminput1 = document.getElementById('commenttermlistdropdown');
            studcommentterminput1.addEventListener('change', e=>{
                console.log('how')
        const selected_commentsubjectinput = e.target.value
        const val = $('#commentsessionslistdropdown').val();
        const val2 = $('#commentsectionlistdropdown').val();
        const val3 = $('#commentclasslistdropdown').val();
        const val4 = $('#commenttermlistdropdown').val();
        $('#commentlist2').remove();

        $.ajax({
            type:'POST',
            url:'psyc/list/',
            data: {
                csrfmiddlewaretoken:csrftoken,
                session_name:val,
                section_name:val2,
                class_name:val3,
                term_name:val4,
                subject_name:selected_commentsubjectinput
            },
            success: function(response){
                console.log(response.teacher_comment, response.head_teacher_comment, response.average)
                $('#commentlist').append('<div id="commentlist2" class="commentlist2 col-12"><div id="newdivc" class="newdivc"></div></div>');
                var one = response.teacher_comment
                var two = response.head_teacher_comment
                var three = response.stud_name
                var four = response.identity
                var five = response.average
                for (v in one, two, three, four, five) {
                    console.log(one[v], two[v], three[v], four[v], five[v])
                    for (y in one[v]); for (z in two[v]); for (d in three[v]); for (f in four[v]); for (g in five[v]); {
                        var one1 = one[v][y];
                        var two1 = two[v][z];
                        var three1 = three[v][d];
                        var four1 = four[v][f];
                        var five1 = five[v][g];
                        console.log(one1, two1, three1, four1, five1)
                        $(".newdivc").append('<br><div class="card psycresult2"><div class="card-body"><h6>AVERAGE: ' + five1 + '%</h6><input type="text" value="' + three1 + '" class="form-control col-5 stud_name_for_psyc" name="stud_name_for_psyc" id="' + four1 + '"></br><label for="teacher_comm_' + four1 + '">TEACHER COMMENT</label><input type="text" value="' + one1 + '" class="form-control col-5 stud_teacher_comment_for_psyc" name="stud_teacher_comment_for_psyc" id="teacher_comm_' + four1 + '" style="max-width:800px!important;"></br><label for="head_teacher_comm_' + four1 + '"> HEAD TEACHER COMMENT</label><input type="text" value="' + two1 + '" class="form-control col-5 stud_head_teacher_comment_for_psyc" name="stud_head_teacher_comment_for_psyc" id="head_teacher_comm_' + four1 + '" style="max-width:800px!important;"><div class="row col-12"><div class="col-10"></div> <div class="ml-2"></div><input type="button" value="SAVE" class="btn btn-outline-success" name="commentsavebtn" id="commentsavebtnv" onClick="' + func223() + '"></div></div></div><br><hr>');
                        var names1 = $("input[name=stud_name_for_psyc]")
                        names1.attr('readonly', true);
                        $('#commentsavebtn').show();
                        function func223() {
                            console.log('wait')
                            
                            var one = $("#commentsessionslistdropdown").val();
                            var two = $("#commentsectionlistdropdown").val();
                            var three = $("#commentclasslistdropdown").val();
                            var four = $("#commenttermlistdropdown").val();
                            console.log(one, two, three, four)
                            var allis2 = document.querySelectorAll('.psycresult2')
                            for (let i=0; i<allis2.length; i++){
                                
                        
                                var identityy = allis2[i].querySelector('input.stud_name_for_psyc').id;
                                var stud_name = allis2[i].querySelector('input.stud_name_for_psyc').value;
                                var teacher_comment = allis2[i].querySelector('input.stud_teacher_comment_for_psyc').value;
                                var head_teacher_comment = allis2[i].querySelector('input.stud_head_teacher_comment_for_psyc').value;
                                
                                console.log(stud_name, teacher_comment, head_teacher_comment, identityy)
                        
                                $.ajax({
                                    type: "POST",
                                    url: `comment/submit/${identityy}/`,
                                    data: {
                                        csrfmiddlewaretoken:csrftoken,
                                        stud_name:stud_name,
                                        session_name:one,
                                        section_name:two,
                                        class_name:three,
                                        term_name:four,
                                        teacher_comment:teacher_comment,
                                        head_teacher_comment:head_teacher_comment,
                                    },
                                
                                    success: function(response) {
                                        document.querySelector(".tabs .tab-content .actives").scrollTo(top);
                        
                                        
                        
                                        
                                    }
                                });
                        
                                
                            }
                        };
                    } 

                } 
            }
        });
            })
           
            


            const primresultterminput1 = document.getElementById('resultsheettermlistdropdown');
            

            primresultterminput1.addEventListener('change', e=>{
            console.log(e.target.value)
            const selected_primresultterminput1 = e.target.value
            var one = $('#resultsheetsessionslistdropdown').val();
            var two = $('#resultsheetsectionlistdropdown').val();
            var three = $('#resultsheetclasslistdropdown').val();
            console.log(one, two, three, selected_primresultterminput1)
            $('#studentresultlistsheet2').remove();

            $.ajax({
                type:'POST',
                url:'student/result/get/',
                data: {
                    csrfmiddlewaretoken:csrftoken,
                    session_name:one,
                    section_name:two,
                    class_name:three,
                    term_name:selected_primresultterminput1,
                },
                success: function(response){
                    $('#studentresultlistsheet').append('<div id="studentresultlistsheet2" class="studentresultlistsheet2" ><div class="card"><div class="card-body"><form action="" class="row"><h5 class="col-7" style="margin-left: 20px!important;">STUDENT NAME</h5><h5 class="col-3" style="margin-left: 40px!important;">PRINT PDF</h5></form></div></div><div id="studresultsheet" class="studresultsheet"></div></div>');
                    console.log(response.identity, response.stud_name)
                    for (x in response.identity, response.stud_name) {
                        for (a in response.identity[x]); for (b in response.stud_name[x]); {
                            if (two == 'PRIMARY SECTION') {
                                primresult = '/student/primresultsheet/' + one + '/' + two + '/' + three + '/' + selected_primresultterminput1 + '/' + response.identity[x][a] + ''
                            } else if (two == 'NURSERY SECTION') {
                                primresult = '/student/nurresultsheet/' + one + '/' + two + '/' + three + '/' + selected_primresultterminput1 + '/' + response.identity[x][a] + ''
                            }
                            $('#studresultsheet').append('<div class="card studresultsheet"><div class="card-body"><div class="row"><input type="text" class="form-control studresultsheetname col-5" value="' + response.stud_name[x][b] + '" id="' + response.identity[x][a] + '" name="studresultsheetname" style="padding-right:50px!important;"><div class="col-4"></div><a href="' + primresult + '" target="_blank"><div class="col-4"></div><input type="button" class="btn btn-outline-primary studresultsheetbtn" value="PRINT PDF" id="' + response.identity[x][a] + '" name="studresultsheetbtn"></a></div></div></div>')
                            $('input[name=studresultsheetname]').attr('readonly', true);
                        }
                    }
                    
                }
            });

                
            })


            const nurresultterminput1 = document.getElementById('nurresultsheettermlistdropdown');
            const nurresultsubjectinput = document.getElementById('nurresultsheetsubjectlistdropdown');

            nurresultterminput1.addEventListener('change', e=>{
                console.log(e.target.value)
                const selected_nurresultterminput1 = e.target.value
                const val = $('#nurresultsheetsessionslistdropdown').val();
                const val2 = $('#nurresultsheetsectionlistdropdown').val();
                const val3 = $('#nurresultsheetclasslistdropdown').val();
                console.log(val)
                
                nurresultsubjectinput.innerHTML = ""

                $.ajax({
                    type:'GET',
                    url: `subject/class/${selected_nurresultterminput1}/${val}/${val2}/${val3}/`,
                    success: function(response){
                        console.log(response.datax)
                        const option2 = document.createElement('option')
                        option2.textContent = "Choose a Subject"
                        option2.setAttribute('hidden', true)
                        option2.setAttribute('selected', true)
                        option2.setAttribute('disabled', true)
                        nurresultsubjectinput.appendChild(option2)
                        const data = response.datax
                        data.map(item=>{
                            const option = document.createElement('option')
                            const option2 = document.createElement('option')
                            option.textContent = item.subject_name
                            option2.textContent = "Choose a Subject"
                            option.setAttribute('value', item.subject_name)
                            option.setAttribute('id', item.id)
                            option2.setAttribute('hidden', true)
                            option2.setAttribute('selected', true)
                            option2.setAttribute('disabled', true)
                            nurresultsubjectinput.appendChild(option)
                            nurresultsubjectinput.appendChild(option2)
                        })
                        
                    },
                    error: function(error){
                        console.log(error)
                    }
                });
            })
            
            
            
            
            var formData = new FormData();
            $("#fishpant").on('click', '.createstudent2', function() {
    //$("#createstudent2").click(function(){
        console.log('it is done well')
        var student_session_name = $('#studentsessionslistdropdown').val();
        var student_section_name = $('#studentsectionlistdropdown').val();
        var student_class_name = $('#studentclasslistdropdown').val();
        var student_term_name = $('#studenttermlistdropdown').val();
        var student_first_name = $('#studentfirstnameinput').val();
        var student_middle_name = $('#studentmiddlenameinput').val();
        var student_last_name = $('#studentlastnameinput').val();
        var student_username = $('#studentusernameinput').val();
        var student_gender = $('#studentgenderlistdropdown').val();
        var student_date_of_birth = $('#studentdateofbirthinput').val();
        var student_password_1 = $('#studentpassword1').val();
        var student_password_2 = $('#studentpassword2').val();
        var csrftoken5 = $(".bodo > input[name=csrfmiddlewaretoken]").val();
        
        formData.append('student_session_name', student_session_name);
        formData.append('student_section_name', student_section_name);
        formData.append('student_class_name', student_class_name);
        formData.append('student_term_name', student_term_name);
        formData.append('student_first_name', student_first_name);
        formData.append('student_middle_name', student_middle_name);
        formData.append('student_last_name', student_last_name);
        formData.append('student_username', student_username);
        formData.append('student_gender', student_gender);
        formData.append('student_date_of_birth', student_date_of_birth);
        formData.append('student_password_1', student_password_1);
        formData.append('student_password_2', student_password_2);
        formData.append('image', $('#studentpassport')[0].files[0]);
        formData.append('csrfmiddlewaretoken', csrftoken5);
        formData.append('action', 'create-student');
        
        
        
        console.log(csrftoken5)

        console.log(student_session_name, student_section_name, student_class_name, student_term_name, student_first_name, student_middle_name, student_last_name, student_username, student_gender, student_date_of_birth, student_password_1, student_password_2, formData)
        

        $.ajax({
            type: "POST",
            url: "student/create/",
            data: formData,
            cache: false,
            processData: false,
            contentType: false,
            enctype: 'multipart/form-data',
            success: function(response) {
                alert('student created')
                //$('#createstudent2').remove();
                $('#pigpant').remove();
                $('#fishpant').prepend('<div id="pigpant"><h2>ADD STUDENTS</h2><form action="" autocomplete="new-form" class="studentform" id="createstudentform"><div class="row col-11"><select name="" id="studentsessionslistdropdown" class="col-5 ui dropdown form-control"><option value="" selected disabled hidden>Choose a Session</option></select><div class="col-2"></div><select name="" id="studentsectionlistdropdown" class="col-5 ui dropdown form-control"><option value="" selected disabled hidden>Choose a Section</option></select></div></br><div class="row col-11"><select name="" id="studentclasslistdropdown" class="col-5 ui dropdown form-control"><option value="" selected disabled hidden>Choose a Class</option></select><div class="col-2"></div><select name="" id="studenttermlistdropdown" class="col-5 ui dropdown form-control"><option value="" selected disabled hidden>Choose a Term</option></select></div></br><div class="row col-11"><input type="text" name="" id="studentfirstnameinput" placeholder="First name" class="col-3 ui dropdown form-control"><div class="col-1"></div><input type="text" name="" id="studentmiddlenameinput" placeholder="Middle name" class="col-3 ui dropdown form-control"><div class="col-1"></div><input type="text" name="" id="studentlastnameinput" placeholder="Last name" class="col-3 ui dropdown form-control"></div></br><div class="row col-11"><input type="text" name="" id="studentusernameinput" placeholder="Username" class="col-3 ui dropdown form-control"><div class="col-1"></div><select name="" id="studentgenderlistdropdown" class="col-3 ui dropdown form-control"><option value="Gender" selected disabled hidden>Gender</option><option value="Male">Male</option><option value="Female">Female</option></select><div class="col-1"></div><input type="date" name="" id="studentdateofbirthinput" class="col-3 ui dropdown form-control"></div></br><div class="row col-11"><input type="password" name="" id="studentpassword1" placeholder="Password" class="col-3 ui dropdown form-control" autocomplete="new-password"><input type="checkbox" onclick="myfunction22()" id="nnn" style="margin-left:10px;"><label for="nnn" style="padding-left:10px;">Show password</label><div class="col-1"></div><input type="password" name="" id="studentpassword2" placeholder="Confirm Password" class="col-3 ui dropdown form-control"><input type="checkbox" onclick="myfunction22b()" id="nnn1" style="margin-left:10px;"><label for="nnn1" style="padding-left:10px;">Show password</label></div></br><form action="" id="formdata" method="post" name="file_input"><input type="file" name="file_input" accept="image/png, image/jpeg" id="studentpassport" enctype="multipart/form-data" onchange="preview_image(event)"><br><hr><img id="display_img" style="max-height:210px;"/></form></form><br></div>')
                //$('#pigpant').append('<input type="button" value="CREATE STUDENT" class="btn btn-outline-primary" id="createstudent2">')
                

                $.ajax({
                    type:'GET',
                    url: 'class/session/',
                    success: function(response){ 
                        const studentsessiondropdown = document.getElementById('studentsessionslistdropdown')
                 
                        const sessionsdropdown = response.class_sessions_val
                        sessionsdropdown.map(item=>{
                            
                            const option3 = document.createElement('option')
                   
                            option3.textContent = item.session_name
                            option3.setAttribute('value', item.session_name)
                            option3.setAttribute('id', item.id)
            
                            studentsessiondropdown.appendChild(option3);
                            
            
                        });

                        const studentsessioninput1 = document.getElementById('studentsessionslistdropdown');
    const studentsectiondropdown = document.getElementById('studentsectionlistdropdown');

    studentsessioninput1.addEventListener('change', e=>{
        console.log(e.target.value)
        const selected_studentsessioninput1 = e.target.value
        
        studentsectiondropdown.innerHTML = ""

        $.ajax({
            type:'GET',
            url: `subject/section/${selected_studentsessioninput1}/`,
            success: function(response){
                console.log(response.data2)
                const option2 = document.createElement('option')
                option2.textContent = "Choose a Section"
                option2.setAttribute('hidden', true)
                option2.setAttribute('selected', true)
                option2.setAttribute('disabled', true)
                studentsectiondropdown.appendChild(option2)
                const data = response.data2
                data.map(item=>{
                    const option = document.createElement('option')
                    const option2 = document.createElement('option')
                    option.textContent = item.section_name
                    option2.textContent = "Choose a Section"
                    option.setAttribute('value', item.section_name)
                    option.setAttribute('id', item.id)
                    option2.setAttribute('hidden', true)
                    option2.setAttribute('selected', true)
                    option2.setAttribute('disabled', true)
                    studentsectiondropdown.appendChild(option)
                    studentsectiondropdown.appendChild(option2)
                })
                
            },
            error: function(error){
                console.log(error)
            }
         });
    })



    const studentsectioninput1 = document.getElementById('studentsectionlistdropdown');
    const studentclassdropdown = document.getElementById('studentclasslistdropdown');

    studentsectioninput1.addEventListener('change', e=>{
        console.log(e.target.value)
        const selected_studentsectioninput1 = e.target.value
        const val = $('#studentsessionslistdropdown').val();
        console.log(val)
        
        studentclassdropdown.innerHTML = ""

        $.ajax({
            type:'GET',
            url: `subject/class/${selected_studentsectioninput1}/${val}/`,
            success: function(response){
                console.log(response.data3)
                const option2 = document.createElement('option')
                option2.textContent = "Choose a Class"
                option2.setAttribute('hidden', true)
                option2.setAttribute('selected', true)
                option2.setAttribute('disabled', true)
                studentclassdropdown.appendChild(option2)
                const data = response.data3
                data.map(item=>{
                    const option = document.createElement('option')
                    const option2 = document.createElement('option')
                    option.textContent = item.class_name
                    option2.textContent = "Choose a Class"
                    option.setAttribute('value', item.class_name)
                    option.setAttribute('id', item.id)
                    option2.setAttribute('hidden', true)
                    option2.setAttribute('selected', true)
                    option2.setAttribute('disabled', true)
                    studentclassdropdown.appendChild(option)
                    studentclassdropdown.appendChild(option2)
                })
                
            },
            error: function(error){
                console.log(error)
            }
         });
    })



    const studentclassinput1 = document.getElementById('studentclasslistdropdown');
    const studenttermdropdown = document.getElementById('studenttermlistdropdown');

    studentclassinput1.addEventListener('change', e=>{
        console.log(e.target.value)
        
        studenttermdropdown.innerHTML = ""

        const option2 = document.createElement('option')
        option2.textContent = "Choose a Term"
        option2.setAttribute('hidden', true)
        option2.setAttribute('selected', true)
        option2.setAttribute('disabled', true)
        studenttermdropdown.appendChild(option2)

        const option = document.createElement('option')
        option.textContent = 'FIRST TERM'
        option.setAttribute('value', 'FIRST TERM')
        option.setAttribute('id', '')
        studenttermdropdown.appendChild(option)

        const option3 = document.createElement('option')
        option3.textContent = 'SECOND TERM'
        option3.setAttribute('value', 'SECOND TERM')
        option3.setAttribute('id', '')
        studenttermdropdown.appendChild(option3)

        const option4 = document.createElement('option')
        option4.textContent = 'THIRD TERM'
        option4.setAttribute('value', 'THIRD TERM')
        option4.setAttribute('id', '')
        studenttermdropdown.appendChild(option4)

       
    })
                        
                    },
                    error: function(error){
                        console.log(error)
                    }
                });

                },
            error: function(error){
                alert('student could not be created')
            }
        })
    });
            


            $.ajax({
                type:'GET',
                url: 'class/session/',
                success: function(response){
                    //const sessiondropdown = document.getElementById('class_sessionslistdropdown')
                    const subjectsessiondropdown = document.getElementById('subjectssessionlistdropdown')
                    const studentsessiondropdown = document.getElementById('studentsessionslistdropdown')
                    const resultsessiondropdown = document.getElementById('resultsessionslistdropdown')
                    const nurresultsessiondropdown = document.getElementById('nurresultsessionslistdropdown')
                    const primpsycsessiondropdown = document.getElementById('primresultsessionslistdropdown')
                    const primcommentsessiondropdown = document.getElementById('commentsessionslistdropdown')
                    const primresultsheetsessiondropdown = document.getElementById('resultsheetsessionslistdropdown')
                    const nurresultsheetsessiondropdown = document.getElementById('nurresultsheetsessionslistdropdown')
                    const detailssessionslistdropdown = document.getElementById('detailssessionslistdropdown')
                    
                    const sessionsdropdown = response.class_sessions_val
                    sessionsdropdown.map(item=>{
                        const option = document.createElement('option')
                        const option2 = document.createElement('option')
                        const option3 = document.createElement('option')
                        const option4 = document.createElement('option')
                        const option5 = document.createElement('option')
                        const option6 = document.createElement('option')
                        const option7 = document.createElement('option')
                        const option8 = document.createElement('option')
                        const option9 = document.createElement('option')
                        const option10 = document.createElement('option')
                        option.textContent = item.session_name
                        option.setAttribute('value', item.session_name)
                        option.setAttribute('id', item.id)
        
                        option2.textContent = item.session_name
                        option2.setAttribute('value', item.session_name)
                        option2.setAttribute('id', item.id)
                       
        
                        option3.textContent = item.session_name
                        option3.setAttribute('value', item.session_name)
                        option3.setAttribute('id', item.id)
        
                        option4.textContent = item.session_name
                        option4.setAttribute('value', item.session_name)
                        option4.setAttribute('id', item.id)
        
                        option5.textContent = item.session_name
                        option5.setAttribute('value', item.session_name)
                        option5.setAttribute('id', item.id)

                        option6.textContent = item.session_name
                        option6.setAttribute('value', item.session_name)
                        option6.setAttribute('id', item.id)

                        option7.textContent = item.session_name
                        option7.setAttribute('value', item.session_name)
                        option7.setAttribute('id', item.id)

                        option8.textContent = item.session_name
                        option8.setAttribute('value', item.session_name)
                        option8.setAttribute('id', item.id)

                        option9.textContent = item.session_name
                        option9.setAttribute('value', item.session_name)
                        option9.setAttribute('id', item.id)

                        option10.textContent = item.session_name
                        option10.setAttribute('value', item.session_name)
                        option10.setAttribute('id', item.id)
        
                        //sessiondropdown.appendChild(option);
                        //subjectsessiondropdown.appendChild(option2);
                        studentsessiondropdown.appendChild(option3);
                        resultsessiondropdown.appendChild(option4);
                        nurresultsessiondropdown.appendChild(option5);
                        primpsycsessiondropdown.appendChild(option6);
                        primcommentsessiondropdown.appendChild(option7);
                        primresultsheetsessiondropdown.appendChild(option8);
                        nurresultsheetsessiondropdown.appendChild(option9);
                        detailssessionslistdropdown.appendChild(option10);
                    })
                },
                error: function(error){
                    console.log(error)
                }
            });
            
            
            const resultsessioninput1 = document.getElementById('resultsessionslistdropdown');
            const resultsectiondropdown = document.getElementById('resultsectionlistdropdown');

            resultsessioninput1.addEventListener('change', e=>{
                console.log(e.target.value)
                const selected_resultsessioninput1 = e.target.value
        
                resultsectiondropdown.innerHTML = ""

                $.ajax({
                    type:'GET',
                    url: `subject/section/${selected_resultsessioninput1}/`,
                    success: function(response){
                        console.log(response.data2)
                        const option2 = document.createElement('option')
                        option2.textContent = "Choose a Section"
                        option2.setAttribute('hidden', true)
                        option2.setAttribute('selected', true)
                        option2.setAttribute('disabled', true)
                        studentsectiondropdown.appendChild(option2)
                        const data = response.data2
                        data.map(item=>{
                            const option = document.createElement('option')
                            const option2 = document.createElement('option')
                            option.textContent = item.section_name
                            option2.textContent = "Choose a Section"
                            option.setAttribute('value', item.section_name)
                            option.setAttribute('id', item.id)
                            option2.setAttribute('hidden', true)
                            option2.setAttribute('selected', true)
                            option2.setAttribute('disabled', true)
                            resultsectiondropdown.appendChild(option)
                            resultsectiondropdown.appendChild(option2)
                        })
                
                    },
                    error: function(error){
                        console.log(error)
                    }
                });
            })


            const resultsectioninput1 = document.getElementById('resultsectionlistdropdown');
            const resultclassdropdown = document.getElementById('resultclasslistdropdown');

            resultsectioninput1.addEventListener('change', e=>{
                console.log(e.target.value)
                const selected_resultsectioninput1 = e.target.value
                const val = $('#resultsessionslistdropdown').val();
                console.log(val)
        
                resultclassdropdown.innerHTML = ""

                $.ajax({
                    type:'GET',
                    url: `subject/class/${selected_resultsectioninput1}/${val}/`,
                    success: function(response){
                        console.log(response.data3)
                        const option2 = document.createElement('option')
                        option2.textContent = "Choose a Class"
                        option2.setAttribute('hidden', true)
                        option2.setAttribute('selected', true)
                        option2.setAttribute('disabled', true)
                        studentclassdropdown.appendChild(option2)
                        const data = response.data3
                        data.map(item=>{
                            const option = document.createElement('option')
                            const option2 = document.createElement('option')
                            option.textContent = item.class_name
                            option2.textContent = "Choose a Class"
                            option.setAttribute('value', item.class_name)
                            option.setAttribute('id', item.id)
                            option2.setAttribute('hidden', true)
                            option2.setAttribute('selected', true)
                            option2.setAttribute('disabled', true)
                            resultclassdropdown.appendChild(option)
                            resultclassdropdown.appendChild(option2)
                        })
                
                    },
                    error: function(error){
                        console.log(error)
                    }
                });
            })


            const resultclassinput1 = document.getElementById('resultclasslistdropdown');
            const resulttermdropdown = document.getElementById('resulttermlistdropdown');

            resultclassinput1.addEventListener('change', e=>{
                console.log(e.target.value)
            
                resulttermdropdown.innerHTML = ""

                const option2 = document.createElement('option')
                option2.textContent = "Choose a Term"
                option2.setAttribute('hidden', true)
                option2.setAttribute('selected', true)
                option2.setAttribute('disabled', true)
                resulttermdropdown.appendChild(option2)

                const option = document.createElement('option')
                option.textContent = 'FIRST TERM'
                option.setAttribute('value', 'FIRST TERM')
                option.setAttribute('id', '')
                resulttermdropdown.appendChild(option)

                const option3 = document.createElement('option')
                option3.textContent = 'SECOND TERM'
                option3.setAttribute('value', 'SECOND TERM')
                option3.setAttribute('id', '')
                resulttermdropdown.appendChild(option3)

                const option4 = document.createElement('option')
                option4.textContent = 'THIRD TERM'
                option4.setAttribute('value', 'THIRD TERM')
                option4.setAttribute('id', '')
                resulttermdropdown.appendChild(option4)
            })


            const resulterminput1 = document.getElementById('resulttermlistdropdown');
            const resultsubjectdropdown = document.getElementById('resultsubjectlistdropdown');

            resulterminput1.addEventListener('change', e=>{
                console.log(e.target.value)
                const selected_resultterminput1 = e.target.value
                const val = $('#resultsessionslistdropdown').val();
                const val2 = $('#resultsectionlistdropdown').val();
                const val3 = $('#resultclasslistdropdown').val();
                console.log(val)
                
                resultsubjectdropdown.innerHTML = ""

                $.ajax({
                    type:'GET',
                    url: `subject/class/${selected_resultterminput1}/${val}/${val2}/${val3}/`,
                    success: function(response){
                        console.log(response.datax)
                        const option2 = document.createElement('option')
                        option2.textContent = "Choose a Subject"
                        option2.setAttribute('hidden', true)
                        option2.setAttribute('selected', true)
                        option2.setAttribute('disabled', true)
                        resultsubjectdropdown.appendChild(option2)
                        const data = response.datax
                        data.map(item=>{
                            const option = document.createElement('option')
                            const option2 = document.createElement('option')
                            option.textContent = item.subject_name
                            option2.textContent = "Choose a Subject"
                            option.setAttribute('value', item.subject_name)
                            option.setAttribute('id', item.id)
                            option2.setAttribute('hidden', true)
                            option2.setAttribute('selected', true)
                            option2.setAttribute('disabled', true)
                            resultsubjectdropdown.appendChild(option)
                            resultsubjectdropdown.appendChild(option2)
                        })
                        
                    },
                    error: function(error){
                        console.log(error)
                    }
                });
            })


            var resultupdatebtn = $("input[name=resultupdatebtn]")
            var resultsavebtn = $("input[name=resultsavebtn]")
            resultupdatebtn.hide();
            resultsavebtn.hide();
            const resulsubjectinput1 = document.getElementById('resultsubjectlistdropdown');

            resulsubjectinput1.addEventListener('change', e=>{
                resultsavebtn.hide();
                console.log(e.target.value)
                const selected_resulsubjectinput1 = e.target.value
                const val = $('#resultsessionslistdropdown').val();
                const val2 = $('#resultsectionlistdropdown').val();
                const val3 = $('#resultclasslistdropdown').val();
                const val4 = $('#resulttermlistdropdown').val();
                console.log(val)
                $('#resultlist2').remove();

                $.ajax({
                    type:'GET',
                    url: `result/list/${selected_resulsubjectinput1}/${val}/${val2}/${val3}/${val4}/`,
                    success: function(response){
                        $('#resultlist').append('<div id="resultlist2" class="resultlistlist2" ><div class="card"><div class="card-body"><form action="" class="row"><h5 class="col-4" style="margin-left: 20px!important;">STUDENT NAME</h5><h5 class="col-1" style="margin-left: 40px!important;">1ST CA</h5><h5 class="col-1" style="margin-left: 40px!important;">2ND CA</h5><h5 class="col-1" style="margin-left: 40px!important;">3RD CA</h1><h5 class="col-1" style="margin-left: 40px!important;">4TH CA</h5><h5 class="col-1" style="margin-left: 40px!important;">EXAM</h5></form></div></div><div class="newdiv" id="newdiv"></div></div>');
                        var mydata = response.name
                        var mydata2 = response.data1
                        var mydata3 = response.data2
                        var mydata4 = response.data3
                        var mydata5 = response.data4
                        var mydata6 = response.data5
                        var mydata7 = response.identity
                        for (x in mydata, mydata2, mydata3, mydata4, mydata5, mydata6, mydata7) {
                            console.log(mydata[x], mydata2[x], mydata3[x], mydata4[x], mydata5[x], mydata6[x], mydata7[x])
                            var fish = mydata[x];
                            var chicken = mydata2[x];
                            var fowl = mydata3[x];
                            var cow = mydata4[x];
                            var sheep = mydata5[x];
                            var goat = mydata6[x];
                            var snake = mydata7[x]
                            for (y in fish); for (z in chicken); for (x in fowl); for (b in cow); for (c in sheep); for (d in goat); for (f in snake); {
                                console.log(fish[y], chicken[z], fowl[x], cow[b], sheep[c], goat[d], snake[f])
                                
                                $(".newdiv").append('<div class="card primresult" name="studentresultcard"><div class="card-body"><form action="" class="row" id="prim_result_form" name="student_name"><input type="text" value="' + fish[y] + '" class="form-control col-4 student_name" style="margin-left: 20px!important;" id="' + snake[f] + '" data-id="' + snake[f] + '" name="student_name"><input type="text" value="' + chicken[z] + '" class="form-control col-1 student_first_ca" style="margin-left: 40px!important;" id="student_first_ca" data-id="identity_' + snake[f] + '" name="student_first_ca"><input type="text" value="' + fowl[x] + '" class="form-control col-1 student_second_ca" style="margin-left: 40px!important;" id="student_second_ca" data-id="identity_' + snake[f] + '" name="student_second_ca"><input type="text" value="' + cow[b] + '" class="form-control col-1 student_third_ca" style="margin-left: 40px!important;" id="student_third_ca" data-id="identity_' + snake[f] + '" name="student_third_ca"><input type="text" value="' + sheep[c] + '" class="form-control col-1 student_fourth_ca" style="margin-left: 40px!important;" id="student_fourth_ca" data-id="identity_' + snake[f] + '" name="student_fourth_ca"><input type="text" value="' + goat[d] + '" class="form-control col-1 student_exam" style="margin-left: 40px!important;" id="student_exam" data-id="identity_' + snake[f] + '" name="student_exam"></form></div></div>'); 
                                
                            }
                        }
                        
                        var name = $("input[name=student_name]")
                        var first_ca = $("input[name=student_first_ca]")
                        var second_ca = $("input[name=student_second_ca]")
                        var third_ca = $("input[name=student_third_ca]")
                        var fourth_ca = $("input[name=student_fourth_ca]")
                        var exam = $("input[name=student_exam]")
                        name.attr('readonly', true);
                        first_ca.attr('readonly', true);
                        second_ca.attr('readonly', true);
                        third_ca.attr('readonly', true); 
                        fourth_ca.attr('readonly', true);
                        exam.attr('readonly', true);
                        resultupdatebtn.show();  
                    },
                    error: function(error){
                        console.log(error)
                    }
                });
            })

        const nurresultsessioninput1 = document.getElementById('nurresultsessionslistdropdown');
        const nurresultsectiondropdown = document.getElementById('nurresultsectionlistdropdown');

        nurresultsessioninput1.addEventListener('change', e=>{
            console.log(e.target.value)
            const selected_nurresultsessioninput1 = e.target.value
            
            nurresultsectiondropdown.innerHTML = ""

            $.ajax({
                type:'GET',
                url: `subject/section/${selected_nurresultsessioninput1}/`,
                success: function(response){
                    console.log(response.data2)
                    const option2 = document.createElement('option')
                    option2.textContent = "Choose a Section"
                    option2.setAttribute('hidden', true)
                    option2.setAttribute('selected', true)
                    option2.setAttribute('disabled', true)
                    studentsectiondropdown.appendChild(option2)
                    const data = response.data2
                    data.map(item=>{
                        const option = document.createElement('option')
                        const option2 = document.createElement('option')
                        option.textContent = item.section_name
                        option2.textContent = "Choose a Section"
                        option.setAttribute('value', item.section_name)
                        option.setAttribute('id', item.id)
                        option2.setAttribute('hidden', true)
                        option2.setAttribute('selected', true)
                        option2.setAttribute('disabled', true)
                        nurresultsectiondropdown.appendChild(option)
                        nurresultsectiondropdown.appendChild(option2)
                    })
                    
                },
                error: function(error){
                    console.log(error)
                }
            });
        })


        const nurresultsectioninput1 = document.getElementById('nurresultsectionlistdropdown');
        const nurresultclassdropdown = document.getElementById('nurresultclasslistdropdown');

        nurresultsectioninput1.addEventListener('change', e=>{
            console.log(e.target.value)
            const selected_nurresultsectioninput1 = e.target.value
            const val = $('#nurresultsessionslistdropdown').val();
            console.log(val)
            
            nurresultclassdropdown.innerHTML = ""

            $.ajax({
                type:'GET',
                url: `subject/class/${selected_nurresultsectioninput1}/${val}/`,
                success: function(response){
                    console.log(response.data3)
                    const option2 = document.createElement('option')
                    option2.textContent = "Choose a Class"
                    option2.setAttribute('hidden', true)
                    option2.setAttribute('selected', true)
                    option2.setAttribute('disabled', true)
                    studentclassdropdown.appendChild(option2)
                    const data = response.data3
                    data.map(item=>{
                        const option = document.createElement('option')
                        const option2 = document.createElement('option')
                        option.textContent = item.class_name
                        option2.textContent = "Choose a Class"
                        option.setAttribute('value', item.class_name)
                        option.setAttribute('id', item.id)
                        option2.setAttribute('hidden', true)
                        option2.setAttribute('selected', true)
                        option2.setAttribute('disabled', true)
                        nurresultclassdropdown.appendChild(option)
                        nurresultclassdropdown.appendChild(option2)
                    })
                    
                },
                error: function(error){
                    console.log(error)
                }
            });
        })


        const nurresultclassinput1 = document.getElementById('nurresultclasslistdropdown');
        const nurresulttermdropdown = document.getElementById('nurresulttermlistdropdown');

        nurresultclassinput1.addEventListener('change', e=>{
            console.log(e.target.value)
            
            nurresulttermdropdown.innerHTML = ""

            const option2 = document.createElement('option')
            option2.textContent = "Choose a Term"
            option2.setAttribute('hidden', true)
            option2.setAttribute('selected', true)
            option2.setAttribute('disabled', true)
            nurresulttermdropdown.appendChild(option2)

            const option = document.createElement('option')
            option.textContent = 'FIRST TERM'
            option.setAttribute('value', 'FIRST TERM')
            option.setAttribute('id', '')
            nurresulttermdropdown.appendChild(option)

            const option3 = document.createElement('option')
            option3.textContent = 'SECOND TERM'
            option3.setAttribute('value', 'SECOND TERM')
            option3.setAttribute('id', '')
            nurresulttermdropdown.appendChild(option3)

            const option4 = document.createElement('option')
            option4.textContent = 'THIRD TERM'
            option4.setAttribute('value', 'THIRD TERM')
            option4.setAttribute('id', '')
            nurresulttermdropdown.appendChild(option4)

        
        })


        const nurresulterminput1 = document.getElementById('nurresulttermlistdropdown');
        const nurresultsubjectdropdown = document.getElementById('nurresultsubjectlistdropdown');

        nurresulterminput1.addEventListener('change', e=>{
            console.log(e.target.value)
            const selected_nurresultterminput1 = e.target.value
            const val = $('#nurresultsessionslistdropdown').val();
            const val2 = $('#nurresultsectionlistdropdown').val();
            const val3 = $('#nurresultclasslistdropdown').val();
            console.log(val)
            
            nurresultsubjectdropdown.innerHTML = ""

            $.ajax({
                type:'GET',
                url: `subject/class/${selected_nurresultterminput1}/${val}/${val2}/${val3}/`,
                success: function(response){
                    console.log(response.datax)
                    const option2 = document.createElement('option')
                    option2.textContent = "Choose a Subject"
                    option2.setAttribute('hidden', true)
                    option2.setAttribute('selected', true)
                    option2.setAttribute('disabled', true)
                    nurresultsubjectdropdown.appendChild(option2)
                    const data = response.datax
                    data.map(item=>{
                        const option = document.createElement('option')
                        const option2 = document.createElement('option')
                        option.textContent = item.subject_name
                        option2.textContent = "Choose a Subject"
                        option.setAttribute('value', item.subject_name)
                        option.setAttribute('id', item.id)
                        option2.setAttribute('hidden', true)
                        option2.setAttribute('selected', true)
                        option2.setAttribute('disabled', true)
                        nurresultsubjectdropdown.appendChild(option)
                        nurresultsubjectdropdown.appendChild(option2)
                    })
                    
                },
                error: function(error){
                    console.log(error)
                }
            });
        })



        var nurresulsubjectinput1 = document.getElementById('nurresultsubjectlistdropdown');

        nurresulsubjectinput1.addEventListener('change', e=>{
            
            console.log(e.target.value)
            const selected_nurresulsubjectinput1 = e.target.value
            const val = $('#nurresultsessionslistdropdown').val();
            const val2 = $('#nurresultsectionlistdropdown').val();
            const val3 = $('#nurresultclasslistdropdown').val();
            const val4 = $('#nurresulttermlistdropdown').val();
            console.log(val)
            $('#nurresultlist2').remove();
            

            $.ajax({
                type:'GET',
                url: `result/list_nur/${selected_nurresulsubjectinput1}/${val}/${val2}/${val3}/${val4}/`,
                success: function(response){
                    $('#nurresultlist').append('<div id="nurresultlist2" class="nurresultlistlist2 col-12 studentresultcontent" ></div>');
                    var mydata = response.stud_name
                    
                    var mydata2 = response.data1
                    var mydata3 = response.data2
                    var mydata4 = response.data3
                    var mydata5 = response.data4
                    var mydata6 = response.data5
                    var mydata7 = response.data6
                    var mydata8 = response.data7
                    var mydata9 = response.data8
                    var mydata10 = response.data9
                    var mydata11 = response.data10
                    var mydata12 = response.data11
                    var mydata13 = response.data12
                    var mydata14 = response.data13
                    var mydata15 = response.data14
                    var mydata16 = response.identity
                    console.log(mydata16)
                    var frontend1 = response.data15
                    var frontend2 = response.data16
                    var frontend3 = response.data17
                    var frontend4 = response.data18
                    var frontend5 = response.data19
                    var frontend6 = response.data20
                    var frontend7 = response.data21
                    var frontend8 = response.data22
                    var frontend9 = response.data23
                    var frontend10 = response.data24
                    var frontend11 = response.data25
                    var frontend12 = response.data26                
                    for (x in mydata, mydata2, mydata3, mydata4, mydata5, mydata6, mydata7, mydata8, mydata9, mydata10, mydata11, mydata12, mydata13, mydata14, mydata15, mydata16, frontend1, frontend2, frontend3, frontend4, frontend5, frontend6, frontend7, frontend8, frontend9, frontend10, frontend11, frontend12) {
                        console.log(mydata[x], mydata2[x], mydata3[x], mydata4[x], mydata5[x], mydata6[x], mydata7[x], mydata8[x], mydata9[x], mydata10[x], mydata11[x], mydata12[x], mydata13[x], mydata14[x], mydata15[x], mydata16[x], frontend1[x], frontend2[x], frontend3[x], frontend4[x], frontend5[x], frontend6[x], frontend7[x], frontend8[x], frontend9[x], frontend10[x], frontend11[x], frontend12[x])
                        var fish = mydata[x];
                        var chicken = mydata2[x];
                        var fowl = mydata3[x];
                        var cow = mydata4[x];
                        var sheep = mydata5[x];
                        var goat = mydata6[x];
                        var snake = mydata7[x];
                        var rabbit = mydata8[x];
                        var chic = mydata9[x];
                        var hen = mydata10[x];
                        var whale = mydata11[x];
                        var shark = mydata12[x];
                        var dolphin = mydata13[x];
                        var snail = mydata14[x];
                        var spider = mydata15[x];
                        var housefly = mydata16[x];
                        var front1 = frontend1[x];
                        var front2 = frontend2[x];
                        var front3 = frontend3[x];
                        var front4 = frontend4[x];
                        var front5 = frontend5[x];
                        var front6 = frontend6[x];
                        var front7 = frontend7[x];
                        var front8 = frontend8[x];
                        var front9 = frontend9[x];
                        var front10 = frontend10[x];
                        var front11 = frontend11[x];
                        var front12 = frontend12[x];                    

                    for (y in fish); for (z in chicken); for (x in fowl); for (b in cow); for (c in sheep); for (d in goat); for (f in snake); for (g in rabbit); for (h in chic); for (ee in hen); for (j in whale); for (k in shark); for (l in dolphin); for (m in snail); for (n in spider); for (o in housefly); for (p in front1); for (q in front2); for (r in front3); for (s in front4); for (t in front5); for (u in front6); for (v in front7); for (w in front8); for (bb in front9); for (aa in front10); for (cc in front11); for (dd in front12); {
                         console.log(fish[y], chicken[z], fowl[x], cow[b], sheep[c], goat[d], snake[f], rabbit[g], chic[h], hen[ee], whale[j], shark[k], dolphin[l], snail[m], spider[n], housefly[o], front1[p], front2[q], front3[r], front4[s], front5[t], front6[u], front7[v], front8[w], front9[bb], front10[aa], front11[cc], front12[dd])
                        if (selected_nurresulsubjectinput1 == 'LITERACY') {
                            $(".nurresultlistlist2").append('<div class="card" id="unique_card_' + housefly[o] + '"><div class="card-body"><h5>' + fish[y] + '</h5><h6>' + housefly[o] + '</h6><br><h7>' + selected_nurresulsubjectinput1 + '</h7><br><br><table class="table"><tbody><td>QUESTIONS</td><td>GRADES</td></tbody><tbody><td>I listen quitely to stories</td><td><form action="POST" class="col-11"><input type="radio" id="literacy_question_1_a_' + housefly[o] + '" name="literacy_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="literacy_question_1_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="literacy_question_1_b_' + housefly[o] + '" name="literacy_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="literacy_question_1_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="literacy_question_1_c_' + housefly[o] + '" name="literacy_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="literacy_question_1_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="literacy_question_1_d_' + housefly[o] + '" name="literacy_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="literacy_question_1_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>My attention span is lengthening</td><td><form action="POST" class="col-11"><input type="radio" id="literacy_question_2_a_' + housefly[o] + '" name="literacy_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="literacy_question_2_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="literacy_question_2_b_' + housefly[o] + '" name="literacy_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="literacy_question_2_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="literacy_question_2_c_' + housefly[o] + '" name="literacy_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="literacy_question_2_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="literacy_question_2_d_' + housefly[o] + '" name="literacy_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="literacy_question_2_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I respond to a story by recalling specific details</td><td><form action="POST" class="col-11"><input type="radio" id="literacy_question_3_a_' + housefly[o] + '" name="literacy_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="literacy_question_3_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="literacy_question_3_b_' + housefly[o] + '" name="literacy_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="literacy_question_3_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="literacy_question_3_c_' + housefly[o] + '" name="literacy_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="literacy_question_3_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="literacy_question_3_d_' + housefly[o] + '" name="literacy_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="literacy_question_3_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I speak clearly and communicate in sentence</td><td><form action="POST" class="col-11"><input type="radio" id="literacy_question_4_a_' + housefly[o] + '" name="literacy_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="literacy_question_4_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="literacy_question_4_b_' + housefly[o] + '" name="literacy_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="literacy_question_4_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="literacy_question_4_c_' + housefly[o] + '" name="literacy_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="literacy_question_4_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="literacy_question_4_d_' + housefly[o] + '" name="literacy_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="literacy_question_4_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I speak clearly and communicate my wants and ideas</td><td><form action="POST" class="col-11"><input type="radio" id="literacy_question_5_a_' + housefly[o] + '" name="literacy_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="literacy_question_5_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="literacy_question_5_b_' + housefly[o] + '" name="literacy_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="literacy_question_5_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="literacy_question_5_c_' + housefly[o] + '" name="literacy_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="literacy_question_5_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="literacy_question_5_d_' + housefly[o] + '" name="literacy_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="literacy_question_5_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I can answer some questions</td><td><form action="POST" class="col-11"><input type="radio" id="literacy_question_6_a_' + housefly[o] + '" name="literacy_question_6_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="literacy_question_6_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="literacy_question_6_b_' + housefly[o] + '" name="literacy_question_6_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="literacy_question_6_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="literacy_question_6_c_' + housefly[o] + '" name="literacy_question_6_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="literacy_question_6_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="literacy_question_6_d_' + housefly[o] + '" name="literacy_question_6_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="literacy_question_6_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I talk about pictures</td><td><form action="POST" class="col-11"><input type="radio" id="literacy_question_7_a_' + housefly[o] + '" name="literacy_question_7_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="literacy_question_7_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="literacy_question_7_b_' + housefly[o] + '" name="literacy_question_7_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="literacy_question_7_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="literacy_question_7_c_' + housefly[o] + '" name="literacy_question_7_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="literacy_question_7_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="literacy_question_7_d_' + housefly[o] + '" name="literacy_question_7_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="literacy_question_7_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I am expanding my vocabulary</td><td><form action="POST" class="col-11"><input type="radio" id="literacy_question_8_a_' + housefly[o] + '" name="literacy_question_8_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="literacy_question_8_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="literacy_question_8_b_' + housefly[o] + '" name="literacy_question_8_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="literacy_question_8_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="literacy_question_8_c_' + housefly[o] + '" name="literacy_question_8_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="literacy_question_8_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="literacy_question_8_d_' + housefly[o] + '" name="literacy_question_8_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="literacy_question_8_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody></table><br><div class="row col-12 ml-1"><input type="button" name="PREVIOUS" id="nurresultpreviousbtn" class="btn btn-outline-success col-1" value="PREVIOUS"><div class="col-10"></div><input type="button" name="NEXT" id="nurresultsavebtn" class="btn btn-outline-success col-1" value="NEXT"></div></div></div>');
                            //m let nurresultContents = document.getElementById("unique_card_1");
                            //nurresultContents.classList.add("active");
                            if (chicken[z] == 'A') {
                                document.getElementById('literacy_question_1_a_' + housefly[o]).checked = true;
                            } else if (chicken[z] == 'B') {
                                document.getElementById('literacy_question_1_b_' + housefly[o]).checked = true;
                            } else if (chicken[z] == 'C') {
                                document.getElementById('literacy_question_1_c_' + housefly[o]).checked = true;
                            } else if (chicken[z] == 'D') {
                                document.getElementById('literacy_question_1_d_' + housefly[o]).checked = true;
                            }


                            if (fowl[x] == 'A') {
                                document.getElementById('literacy_question_2_a_' + housefly[o]).checked = true;
                            } else if (fowl[x] == 'B') {
                                document.getElementById('literacy_question_2_b_' + housefly[o]).checked = true;
                            } else if (fowl[x] == 'C') {
                                document.getElementById('literacy_question_2_c_' + housefly[o]).checked = true;
                            } else if (fowl[x] == 'D') {
                                document.getElementById('literacy_question_2_d_' + housefly[o]).checked = true;
                            }

                            if (cow[b] == 'A') {
                                document.getElementById('literacy_question_3_a_' + housefly[o]).checked = true;
                            } else if (cow[b] == 'B') {
                                document.getElementById('literacy_question_3_b_' + housefly[o]).checked = true;
                            } else if (cow[b] == 'C') {
                                document.getElementById('literacy_question_3_c_' + housefly[o]).checked = true;
                            } else if (cow[b] == 'D') {
                                document.getElementById('literacy_question_3_d_' + housefly[o]).checked = true;
                            }

                            if (sheep[c] == 'A') {
                                document.getElementById('literacy_question_4_a_' + housefly[o]).checked = true;
                            } else if (sheep[c] == 'B') {
                                document.getElementById('literacy_question_4_b_' + housefly[o]).checked = true;
                            } else if (sheep[c] == 'C') {
                                document.getElementById('literacy_question_4_c_' + housefly[o]).checked = true;
                            } else if (sheep[c] == 'D') {
                                document.getElementById('literacy_question_4_d_' + housefly[o]).checked = true;
                            }

                            if (goat[d] == 'A') {
                                document.getElementById('literacy_question_5_a_' + housefly[o]).checked = true;
                            } else if (goat[d] == 'B') {
                                document.getElementById('literacy_question_5_b_' + housefly[o]).checked = true;
                            } else if (goat[d] == 'C') {
                                document.getElementById('literacy_question_5_c_' + housefly[o]).checked = true;
                            } else if (goat[d] == 'D') {
                                document.getElementById('literacy_question_5_d_' + housefly[o]).checked = true;
                            }

                            if (snake[f] == 'A') {
                                document.getElementById('literacy_question_6_a_' + housefly[o]).checked = true;
                            } else if (snake[f] == 'B') {
                                document.getElementById('literacy_question_6_b_' + housefly[o]).checked = true;
                            } else if (snake[f] == 'C') {
                                document.getElementById('literacy_question_6_c_' + housefly[o]).checked = true;
                            } else if (snake[f] == 'D') {
                                document.getElementById('literacy_question_6_d_' + housefly[o]).checked = true;
                            }

                            if (rabbit[g] == 'A') {
                                document.getElementById('literacy_question_7_a_' + housefly[o]).checked = true;
                            } else if (rabbit[g] == 'B') {
                                document.getElementById('literacy_question_7_b_' + housefly[o]).checked = true;
                            } else if (rabbit[g] == 'C') {
                                document.getElementById('literacy_question_7_c_' + housefly[o]).checked = true;
                            } else if (rabbit[g] == 'D') {
                                document.getElementById('literacy_question_7_d_' + housefly[o]).checked = true;
                            }

                            if (chic[h] == 'A') {
                                document.getElementById('literacy_question_8_a_' + housefly[o]).checked = true;
                            } else if (chic[h] == 'B') {
                                document.getElementById('literacy_question_8_b_' + housefly[o]).checked = true;
                            } else if (chic[h] == 'C') {
                                document.getElementById('literacy_question_8_c_' + housefly[o]).checked = true;
                            } else if (chic[h] == 'D') {
                                document.getElementById('literacy_question_8_d_' + housefly[o]).checked = true;
                            }
                        } else if (selected_nurresulsubjectinput1 == 'NUMERACY') {
                            $(".nurresultlistlist2").append('<div class="card" id="unique_card_' + housefly[o] + '"><div class="card-body"><h5>' + fish[y] + '</h5><h6>' + housefly[o] + '</h6><br><h7>' + selected_nurresulsubjectinput1 + '</h7><br><br><table class="table"><tbody><td>QUESTIONS</td><td>GRADES</td></tbody><tbody><td>I can count orally numbers <input type="text" class="form-control" id="numeracy_question_1_first_input_' + housefly[o] + '" style="width:105px!important;" value="' + front1[p] + '"> to <input type="text" class="form-control" id="numeracy_question_1_second_input_' + housefly[o] + '" style="width:105px!important;" value="' + front2[q] + '"></td><td><form action="POST" class="col-11"><input type="radio" id="numeracy_question_1_a_' + housefly[o] + '" name="numeracy_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="numeracy_question_1_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="numeracy_question_1_b_' + housefly[o] + '" name="numeracy_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="numeracy_question_1_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="numeracy_question_1_c_' + housefly[o] + '" name="numeracy_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="numeracy_question_1_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="numeracy_question_1_d_' + housefly[o] + '" name="numeracy_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="numeracy_question_1_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I can recognise and write numbers <input type="text" class="form-control" id="numeracy_question_2_first_input_' + housefly[o] + '" style="width:105px!important;" value="' + front3[r] + '"> to <input type="text" class="form-control" id="numeracy_question_2_second_input_' + housefly[o] + '" style="width:105px!important;" value="' + front4[s] + '"></td><td><form action="POST" class="col-11"><input type="radio" id="numeracy_question_2_a_' + housefly[o] + '" name="numeracy_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="numeracy_question_2_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="numeracy_question_2_b_' + housefly[o] + '" name="numeracy_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="numeracy_question_2_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="numeracy_question_2_c_' + housefly[o] + '" name="numeracy_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="numeracy_question_2_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="numeracy_question_2_d_' + housefly[o] + '" name="numeracy_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="numeracy_question_2_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I can recognise these shapes <input type="text" class="form-control" id="numeracy_question_3_input_' + housefly[o] + '" style="width:450px!important;" value="' + front5[t] + '"></td><td><form action="POST" class="col-11"><input type="radio" id="numeracy_question_3_a_' + housefly[o] + '" name="numeracy_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="numeracy_question_3_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="numeracy_question_3_b_' + housefly[o] + '" name="numeracy_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="numeracy_question_3_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="numeracy_question_3_c_' + housefly[o] + '" name="numeracy_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="numeracy_question_3_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="numeracy_question_3_d_' + housefly[o] + '" name="numeracy_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="numeracy_question_3_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I can recognise these colours <input type="text" class="form-control" id="numeracy_question_4_input_' + housefly[o] + '" style="width:450px!important;" value="' + front6[u] + '"></td><td><form action="POST" class="col-11"><input type="radio" id="numeracy_question_4_a_' + housefly[o] + '" name="numeracy_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="numeracy_question_4_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="numeracy_question_4_b_' + housefly[o] + '" name="numeracy_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="numeracy_question_4_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="numeracy_question_4_c_' + housefly[o] + '" name="numeracy_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="numeracy_question_4_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="numeracy_question_4_d_' + housefly[o] + '" name="numeracy_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="numeracy_question_4_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I can put together numbers <input type="text" class="form-control" id="numeracy_question_5_first_input_' + housefly[o] + '" style="width:105px!important;" value="' + front7[v] + '"> to <input type="text" class="form-control" id="numeracy_question_5_second_input_' + housefly[o] + '" style="width:105px!important;" value="' + front8[w] + '"></td><td><form action="POST" class="col-11"><input type="radio" id="numeracy_question_5_a_' + housefly[o] + '" name="numeracy_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="numeracy_question_5_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="numeracy_question_5_b_' + housefly[o] + '" name="numeracy_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="numeracy_question_5_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="numeracy_question_5_c_' + housefly[o] + '" name="numeracy_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="numeracy_question_5_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="numeracy_question_5_d_' + housefly[o] + '" name="numeracy_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="numeracy_question_5_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody></table><br><div class="row col-12 ml-1"><input type="button" name="PREVIOUS" id="nurresultpreviousbtn" class="btn btn-outline-success col-1" value="PREVIOUS"><div class="col-10"></div><input type="button" name="NEXT" id="nurresultsavebtn" class="btn btn-outline-success col-1" value="NEXT"></div></div></div>');
                            //let nurresultContents = document.getElementById("unique_card_1");
                            //nurresultContents.classList.add("active");
                            if (chicken[z] == 'A') {
                                document.getElementById('numeracy_question_1_a_' + housefly[o]).checked = true;
                            } else if (chicken[z] == 'B') {
                                document.getElementById('numeracy_question_1_b_' + housefly[o]).checked = true;
                            } else if (chicken[z] == 'C') {
                                document.getElementById('numeracy_question_1_c_' + housefly[o]).checked = true;
                            } else if (chicken[z] == 'D') {
                                document.getElementById('numeracy_question_1_d_' + housefly[o]).checked = true;
                            }


                            if (fowl[x] == 'A') {
                                document.getElementById('numeracy_question_2_a_' + housefly[o]).checked = true;
                            } else if (fowl[x] == 'B') {
                                document.getElementById('numeracy_question_2_b_' + housefly[o]).checked = true;
                            } else if (fowl[x] == 'C') {
                                document.getElementById('numeracy_question_2_c_' + housefly[o]).checked = true;
                            } else if (fowl[x] == 'D') {
                                document.getElementById('numeracy_question_2_d_' + housefly[o]).checked = true;
                            }

                            if (cow[b] == 'A') {
                                document.getElementById('numeracy_question_3_a_' + housefly[o]).checked = true;
                            } else if (cow[b] == 'B') {
                                document.getElementById('numeracy_question_3_b_' + housefly[o]).checked = true;
                            } else if (cow[b] == 'C') {
                                document.getElementById('numeracy_question_3_c_' + housefly[o]).checked = true;
                            } else if (cow[b] == 'D') {
                                document.getElementById('numeracy_question_3_d_' + housefly[o]).checked = true;
                            }

                            if (sheep[c] == 'A') {
                                document.getElementById('numeracy_question_4_a_' + housefly[o]).checked = true;
                            } else if (sheep[c] == 'B') {
                                document.getElementById('numeracy_question_4_b_' + housefly[o]).checked = true;
                            } else if (sheep[c] == 'C') {
                                document.getElementById('numeracy_question_4_c_' + housefly[o]).checked = true;
                            } else if (sheep[c] == 'D') {
                                document.getElementById('numeracy_question_4_d_' + housefly[o]).checked = true;
                            }

                            if (goat[d] == 'A') {
                                document.getElementById('numeracy_question_5_a_' + housefly[o]).checked = true;
                            } else if (goat[d] == 'B') {
                                document.getElementById('numeracy_question_5_b_' + housefly[o]).checked = true;
                            } else if (goat[d] == 'C') {
                                document.getElementById('numeracy_question_5_c_' + housefly[o]).checked = true;
                            } else if (goat[d] == 'D') {
                                document.getElementById('numeracy_question_5_d_' + housefly[o]).checked = true;
                            }

                        } else if (selected_nurresulsubjectinput1 == 'SOCIAL SKILLS') {
                            $(".nurresultlistlist2").append('<div class="card" id="unique_card_' + housefly[o] + '"><div class="card-body"><h5>' + fish[y] + '</h5><h6>' + housefly[o] + '</h6><br><h7>' + selected_nurresulsubjectinput1 + '</h7><br><br><table class="table"><tbody><td>QUESTIONS</td><td>GRADES</td></tbody><tbody><td>I share my toy</td><td><form action="POST" class="col-11"><input type="radio" id="social_skills_question_1_a_' + housefly[o] + '" name="social_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="social_skills_question_1_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="social_skills_question_1_b_' + housefly[o] + '" name="social_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="social_skills_question_1_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="social_skills_question_1_c_' + housefly[o] + '" name="social_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="social_skills_question_1_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="social_skills_question_1_d_' + housefly[o] + '" name="social_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="social_skills_question_1_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I drink without spilling</td><td><form action="POST" class="col-11"><input type="radio" id="social_skills_question_2_a_' + housefly[o] + '" name="social_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="social_skills_question_2_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="social_skills_question_2_b_' + housefly[o] + '" name="social_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="social_skills_question_2_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="social_skills_question_2_c_' + housefly[o] + '" name="social_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="social_skills_question_2_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="social_skills_question_2_d_' + housefly[o] + '" name="social_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="social_skills_question_2_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I hold spoon, food gets to my mouth</td><td><form action="POST" class="col-11"><input type="radio" id="social_skills_question_3_a_' + housefly[o] + '" name="social_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="social_skills_question_3_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="social_skills_question_3_b_' + housefly[o] + '" name="social_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="social_skills_question_3_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="social_skills_question_3_c_' + housefly[o] + '" name="social_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="social_skills_question_3_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="social_skills_question_3_d_' + housefly[o] + '" name="social_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="social_skills_question_3_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I take care of things</td><td><form action="POST" class="col-11"><input type="radio" id="social_skills_question_4_a_' + housefly[o] + '" name="social_skills_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="social_skills_question_4_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="social_skills_question_4_b_' + housefly[o] + '" name="social_skills_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="social_skills_question_4_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="social_skills_question_4_c_' + housefly[o] + '" name="social_skills_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="social_skills_question_4_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="social_skills_question_4_d_' + housefly[o] + '" name="social_skills_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="social_skills_question_4_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I am happy at work</td><td><form action="POST" class="col-11"><input type="radio" id="social_skills_question_5_a_' + housefly[o] + '" name="social_skills_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="social_skills_question_5_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="social_skills_question_5_b_' + housefly[o] + '" name="social_skills_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="social_skills_question_5_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="social_skills_question_5_c_' + housefly[o] + '" name="social_skills_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="social_skills_question_5_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="social_skills_question_5_d_' + housefly[o] + '" name="social_skills_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="social_skills_question_5_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I am happy at play</td><td><form action="POST" class="col-11"><input type="radio" id="social_skills_question_6_a_' + housefly[o] + '" name="social_skills_question_6_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="social_skills_question_6_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="social_skills_question_6_b_' + housefly[o] + '" name="social_skills_question_6_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="social_skills_question_6_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="social_skills_question_6_c_' + housefly[o] + '" name="social_skills_question_6_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="social_skills_question_6_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="social_skills_question_6_d_' + housefly[o] + '" name="social_skills_question_6_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="social_skills_question_6_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I play with others</td><td><form action="POST" class="col-11"><input type="radio" id="social_skills_question_7_a_' + housefly[o] + '" name="social_skills_question_7_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="social_skills_question_7_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="social_skills_question_7_b_' + housefly[o] + '" name="social_skills_question_7_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="social_skills_question_7_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="social_skills_question_7_c_' + housefly[o] + '" name="social_skills_question_7_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="social_skills_question_7_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="social_skills_question_7_d_' + housefly[o] + '" name="social_skills_question_7_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="social_skills_question_7_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I use toilet with/without help</td><td><form action="POST" class="col-11"><input type="radio" id="social_skills_question_8_a_' + housefly[o] + '" name="social_skills_question_8_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="social_skills_question_8_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="social_skills_question_8_b_' + housefly[o] + '" name="social_skills_question_8_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="social_skills_question_8_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="social_skills_question_8_c_' + housefly[o] + '" name="social_skills_question_8_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="social_skills_question_8_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="social_skills_question_8_d_' + housefly[o] + '" name="social_skills_question_8_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="social_skills_question_8_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I help tidy up</td><td><form action="POST" class="col-11"><input type="radio" id="social_skills_question_9_a_' + housefly[o] + '" name="social_skills_question_9_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="social_skills_question_9_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="social_skills_question_9_b_' + housefly[o] + '" name="social_skills_question_9_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="social_skills_question_9_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="social_skills_question_9_c_' + housefly[o] + '" name="social_skills_question_9_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="social_skills_question_9_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="social_skills_question_9_d_' + housefly[o] + '" name="social_skills_question_9_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="social_skills_question_9_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I follow simple instructions</td><td><form action="POST" class="col-11"><input type="radio" id="social_skills_question_10_a_' + housefly[o] + '" name="social_skills_question_10_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="social_skills_question_10_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="social_skills_question_10_b_' + housefly[o] + '" name="social_skills_question_10_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="social_skills_question_10_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="social_skills_question_10_c_' + housefly[o] + '" name="social_skills_question_10_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="social_skills_question_10_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="social_skills_question_10_d_' + housefly[o] + '" name="social_skills_question_10_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="social_skills_question_10_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I dont fight, snatch or throw things</td><td><form action="POST" class="col-11"><input type="radio" id="social_skills_question_11_a_' + housefly[o] + '" name="social_skills_question_11_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="social_skills_question_11_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="social_skills_question_11_b_' + housefly[o] + '" name="social_skills_question_11_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="social_skills_question_11_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="social_skills_question_11_c_' + housefly[o] + '" name="social_skills_question_11_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="social_skills_question_11_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="social_skills_question_11_d_' + housefly[o] + '" name="social_skills_question_11_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="social_skills_question_11_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I dont shout or scream</td><td><form action="POST" class="col-11"><input type="radio" id="social_skills_question_12_a_' + housefly[o] + '" name="social_skills_question_12_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="social_skills_question_12_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="social_skills_question_12_b_' + housefly[o] + '" name="social_skills_question_12_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="social_skills_question_12_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="social_skills_question_12_c_' + housefly[o] + '" name="social_skills_question_12_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="social_skills_question_12_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="social_skills_question_12_d_' + housefly[o] + '" name="social_skills_question_12_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="social_skills_question_12_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody></table><br><div class="row col-12 ml-1"><input type="button" name="PREVIOUS" id="nurresultpreviousbtn" class="btn btn-outline-success col-1" value="PREVIOUS"><div class="col-10"></div><input type="button" name="NEXT" id="nurresultsavebtn" class="btn btn-outline-success col-1" value="NEXT"></div></div></div>');
                            //let nurresultContents = document.getElementById("unique_card_1");
                            //nurresultContents.classList.add("active");
                            if (chicken[z] == 'A') {
                                document.getElementById('social_skills_question_1_a_' + housefly[o]).checked = true;
                            } else if (chicken[z] == 'B') {
                                document.getElementById('social_skills_question_1_b_' + housefly[o]).checked = true;
                            } else if (chicken[z] == 'C') {
                                document.getElementById('social_skills_question_1_c_' + housefly[o]).checked = true;
                            } else if (chicken[z] == 'D') {
                                document.getElementById('social_skills_question_1_d_' + housefly[o]).checked = true;
                            }


                            if (fowl[x] == 'A') {
                                document.getElementById('social_skills_question_2_a_' + housefly[o]).checked = true;
                            } else if (fowl[x] == 'B') {
                                document.getElementById('social_skills_question_2_b_' + housefly[o]).checked = true;
                            } else if (fowl[x] == 'C') {
                                document.getElementById('social_skills_question_2_c_' + housefly[o]).checked = true;
                            } else if (fowl[x] == 'D') {
                                document.getElementById('social_skills_question_2_d_' + housefly[o]).checked = true;
                            }

                            if (cow[b] == 'A') {
                                document.getElementById('social_skills_question_3_a_' + housefly[o]).checked = true;
                            } else if (cow[b] == 'B') {
                                document.getElementById('social_skills_question_3_b_' + housefly[o]).checked = true;
                            } else if (cow[b] == 'C') {
                                document.getElementById('social_skills_question_3_c_' + housefly[o]).checked = true;
                            } else if (cow[b] == 'D') {
                                document.getElementById('social_skills_question_3_d_' + housefly[o]).checked = true;
                            }

                            if (sheep[c] == 'A') {
                                document.getElementById('social_skills_question_4_a_' + housefly[o]).checked = true;
                            } else if (sheep[c] == 'B') {
                                document.getElementById('social_skills_question_4_b_' + housefly[o]).checked = true;
                            } else if (sheep[c] == 'C') {
                                document.getElementById('social_skills_question_4_c_' + housefly[o]).checked = true;
                            } else if (sheep[c] == 'D') {
                                document.getElementById('social_skills_question_4_d_' + housefly[o]).checked = true;
                            }

                            if (goat[d] == 'A') {
                                document.getElementById('social_skills_question_5_a_' + housefly[o]).checked = true;
                            } else if (goat[d] == 'B') {
                                document.getElementById('social_skills_question_5_b_' + housefly[o]).checked = true;
                            } else if (goat[d] == 'C') {
                                document.getElementById('social_skills_question_5_c_' + housefly[o]).checked = true;
                            } else if (goat[d] == 'D') {
                                document.getElementById('social_skills_question_5_d_' + housefly[o]).checked = true;
                            }

                            if (snake[f] == 'A') {
                                document.getElementById('social_skills_question_6_a_' + housefly[o]).checked = true;
                            } else if (snake[f] == 'B') {
                                document.getElementById('social_skills_question_6_b_' + housefly[o]).checked = true;
                            } else if (snake[f] == 'C') {
                                document.getElementById('social_skills_question_6_c_' + housefly[o]).checked = true;
                            } else if (snake[f] == 'D') {
                                document.getElementById('social_skills_question_6_d_' + housefly[o]).checked = true;
                            }

                            if (rabbit[g] == 'A') {
                                document.getElementById('social_skills_question_7_a_' + housefly[o]).checked = true;
                            } else if (rabbit[g] == 'B') {
                                document.getElementById('social_skills_question_7_b_' + housefly[o]).checked = true;
                            } else if (rabbit[g] == 'C') {
                                document.getElementById('social_skills_question_7_c_' + housefly[o]).checked = true;
                            } else if (rabbit[g] == 'D') {
                                document.getElementById('social_skills_question_7_d_' + housefly[o]).checked = true;
                            }

                            if (chic[h] == 'A') {
                                document.getElementById('social_skills_question_8_a_' + housefly[o]).checked = true;
                            } else if (chic[h] == 'B') {
                                document.getElementById('social_skills_question_8_b_' + housefly[o]).checked = true;
                            } else if (chic[h] == 'C') {
                                document.getElementById('social_skills_question_8_c_' + housefly[o]).checked = true;
                            } else if (chic[h] == 'D') {
                                document.getElementById('social_skills_question_8_d_' + housefly[o]).checked = true;
                            }

                            if (hen[ee] == 'A') {
                                document.getElementById('social_skills_question_9_a_' + housefly[o]).checked = true;
                            } else if (hen[ee] == 'B') {
                                document.getElementById('social_skills_question_9_b_' + housefly[o]).checked = true;
                            } else if (hen[ee] == 'C') {
                                document.getElementById('social_skills_question_9_c_' + housefly[o]).checked = true;
                            } else if (hen[ee] == 'D') {
                                document.getElementById('social_skills_question_9_d_' + housefly[o]).checked = true;
                            }

                            if (whale[j] == 'A') {
                                document.getElementById('social_skills_question_10_a_' + housefly[o]).checked = true;
                            } else if (whale[j] == 'B') {
                                document.getElementById('social_skills_question_10_b_' + housefly[o]).checked = true;
                            } else if (whale[j] == 'C') {
                                document.getElementById('social_skills_question_10_c_' + housefly[o]).checked = true;
                            } else if (whale[j] == 'D') {
                                document.getElementById('social_skills_question_10_d_' + housefly[o]).checked = true;
                            }

                            if (shark[k] == 'A') {
                                document.getElementById('social_skills_question_11_a_' + housefly[o]).checked = true;
                            } else if (shark[k] == 'B') {
                                document.getElementById('social_skills_question_11_b_' + housefly[o]).checked = true;
                            } else if (shark[k] == 'C') {
                                document.getElementById('social_skills_question_11_c_' + housefly[o]).checked = true;
                            } else if (shark[k] == 'D') {
                                document.getElementById('social_skills_question_11_d_' + housefly[o]).checked = true;
                            }

                            if (dolphin[l] == 'A') {
                                document.getElementById('social_skills_question_12_a_' + housefly[o]).checked = true;
                            } else if (dolphin[l] == 'B') {
                                document.getElementById('social_skills_question_12_b_' + housefly[o]).checked = true;
                            } else if (dolphin[l] == 'C') {
                                document.getElementById('social_skills_question_12_c_' + housefly[o]).checked = true;
                            } else if (dolphin[l] == 'D') {
                                document.getElementById('social_skills_question_12_d_' + housefly[o]).checked = true;
                            }
                        } else if (selected_nurresulsubjectinput1 == 'EMOTIONAL SKILLS') {
                            $(".nurresultlistlist2").append('<div class="card boh" id="unique_card_' + housefly[o] + '"><div class="card-body"><h5>' + fish[y] + '</h5><h6>' + housefly[o] + '</h6><br><h7>' + selected_nurresulsubjectinput1 + '</h7><br><br><table class="table"><tbody><td>QUESTIONS</td><td>GRADES</td></tbody><tbody><td>I respect and show concern for people around me</td><td><form action="POST" class="col-11"><input type="radio" id="emotional_skills_question_1_a_' + housefly[o] + '" name="emotional_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="emotional_skills_question_1_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="emotional_skills_question_1_b_' + housefly[o] + '" name="emotional_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="emotional_skills_question_1_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="emotional_skills_question_1_c_' + housefly[o] + '" name="emotional_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="emotional_skills_question_1_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="emotional_skills_question_1_d_' + housefly[o] + '" name="emotional_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="emotional_skills_question_1_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I accept and respond to my teachers authority</td><td><form action="POST" class="col-11"><input type="radio" id="emotional_skills_question_2_a_' + housefly[o] + '" name="emotional_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="emotional_skills_question_2_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="emotional_skills_question_2_b_' + housefly[o] + '" name="emotional_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="emotional_skills_question_2_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="emotional_skills_question_2_c_' + housefly[o] + '" name="emotional_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="emotional_skills_question_2_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="emotional_skills_question_2_d_' + housefly[o] + '" name="emotional_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="emotional_skills_question_2_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I play and share with other children</td><td><form action="POST" class="col-11"><input type="radio" id="emotional_skills_question_3_a_' + housefly[o] + '" name="emotional_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="emotional_skills_question_3_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="emotional_skills_question_3_b_' + housefly[o] + '" name="emotional_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="emotional_skills_question_3_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="emotional_skills_question_3_c_' + housefly[o] + '" name="emotional_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="emotional_skills_question_3_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="emotional_skills_question_3_d_' + housefly[o] + '" name="emotional_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="emotional_skills_question_3_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I am happy and cheerful at school</td><td><form action="POST" class="col-11"><input type="radio" id="emotional_skills_question_4_a_' + housefly[o] + '" name="emotional_skills_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="emotional_skills_question_4_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="emotional_skills_question_4_b_' + housefly[o] + '" name="emotional_skills_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="emotional_skills_question_4_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="emotional_skills_question_4_c_' + housefly[o] + '" name="emotional_skills_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="emotional_skills_question_4_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="emotional_skills_question_4_d_' + housefly[o] + '" name="emotional_skills_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="emotional_skills_question_4_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody></table><br><div class="row col-12 ml-1"><input type="button" name="PREVIOUS" id="nurresultpreviousbtn" class="btn btn-outline-success col-1" value="PREVIOUS"><div class="col-10"></div><input type="button" name="NEXT" id="nurresultsavebtn" class="btn btn-outline-success col-1" value="NEXT"></div></div></div>');
                            // let nurresultContents = $('div').data("id");
                            // console.log(nurresultContents)
                            // nurresultContents.classList.add("active");
                            if (chicken[z] == 'A') {
                                document.getElementById('emotional_skills_question_1_a_' + housefly[o]).checked = true;
                            } else if (chicken[z] == 'B') {
                                document.getElementById('emotional_skills_question_1_b_' + housefly[o]).checked = true;
                            } else if (chicken[z] == 'C') {
                                document.getElementById('emotional_skills_question_1_c_' + housefly[o]).checked = true;
                            } else if (chicken[z] == 'D') {
                                document.getElementById('emotional_skills_question_1_d_' + housefly[o]).checked = true;
                            }


                            if (fowl[x] == 'A') {
                                document.getElementById('emotional_skills_question_2_a_' + housefly[o]).checked = true;
                            } else if (fowl[x] == 'B') {
                                document.getElementById('emotional_skills_question_2_b_' + housefly[o]).checked = true;
                            } else if (fowl[x] == 'C') {
                                document.getElementById('emotional_skills_question_2_c_' + housefly[o]).checked = true;
                            } else if (fowl[x] == 'D') {
                                document.getElementById('emotional_skills_question_2_d_' + housefly[o]).checked = true;
                            }

                            if (cow[b] == 'A') {
                                document.getElementById('emotional_skills_question_3_a_' + housefly[o]).checked = true;
                            } else if (cow[b] == 'B') {
                                document.getElementById('emotional_skills_question_3_b_' + housefly[o]).checked = true;
                            } else if (cow[b] == 'C') {
                                document.getElementById('emotional_skills_question_3_c_' + housefly[o]).checked = true;
                            } else if (cow[b] == 'D') {
                                document.getElementById('emotional_skills_question_3_d_' + housefly[o]).checked = true;
                            }

                            if (sheep[c] == 'A') {
                                document.getElementById('emotional_skills_question_4_a_' + housefly[o]).checked = true;
                            } else if (sheep[c] == 'B') {
                                document.getElementById('emotional_skills_question_4_b_' + housefly[o]).checked = true;
                            } else if (sheep[c] == 'C') {
                                document.getElementById('emotional_skills_question_4_c_' + housefly[o]).checked = true;
                            } else if (sheep[c] == 'D') {
                                document.getElementById('emotional_skills_question_4_d_' + housefly[o]).checked = true;
                            }
                        } else if (selected_nurresulsubjectinput1 == 'FINE MOTOR SKILLS') {
                            $(".nurresultlistlist2").append('<div class="card" id="unique_card_' + housefly[o] + '"><div class="card-body"><h5>' + fish[y] + '</h5><h6>' + housefly[o] + '</h6><br><h7>' + selected_nurresulsubjectinput1 + '</h7><br><br><table class="table"><tbody><td>QUESTIONS</td><td>GRADES</td></tbody><tbody><td>I can construct a cube tower</td><td><form action="POST" class="col-11"><input type="radio" id="fine_motor_skills_question_1_a_' + housefly[o] + '" name="fine_motor_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="fine_motor_skills_question_1_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="fine_motor_skills_question_1_b_' + housefly[o] + '" name="fine_motor_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="fine_motor_skills_question_1_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="fine_motor_skills_question_1_c_' + housefly[o] + '" name="fine_motor_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="fine_motor_skills_question_1_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="fine_motor_skills_question_1_d_' + housefly[o] + '" name="fine_motor_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="fine_motor_skills_question_1_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I can paint</td><td><form action="POST" class="col-11"><input type="radio" id="fine_motor_skills_question_2_a_' + housefly[o] + '" name="fine_motor_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="fine_motor_skills_question_2_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="fine_motor_skills_question_2_b_' + housefly[o] + '" name="fine_motor_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="fine_motor_skills_question_2_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="fine_motor_skills_question_2_c_' + housefly[o] + '" name="fine_motor_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="fine_motor_skills_question_2_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="fine_motor_skills_question_2_d_' + housefly[o] + '" name="fine_motor_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="fine_motor_skills_question_2_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I can paste and glue</td><td><form action="POST" class="col-11"><input type="radio" id="fine_motor_skills_question_3_a_' + housefly[o] + '" name="fine_motor_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="fine_motor_skills_question_3_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="fine_motor_skills_question_3_b_' + housefly[o] + '" name="fine_motor_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="fine_motor_skills_question_3_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="fine_motor_skills_question_3_c_' + housefly[o] + '" name="fine_motor_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="fine_motor_skills_question_3_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="fine_motor_skills_question_3_d_' + housefly[o] + '" name="fine_motor_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="fine_motor_skills_question_3_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I finish what I start</td><td><form action="POST" class="col-11"><input type="radio" id="fine_motor_skills_question_4_a_' + housefly[o] + '" name="fine_motor_skills_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="fine_motor_skills_question_4_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="fine_motor_skills_question_4_b_' + housefly[o] + '" name="fine_motor_skills_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="fine_motor_skills_question_4_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="fine_motor_skills_question_4_c_' + housefly[o] + '" name="fine_motor_skills_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="fine_motor_skills_question_4_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="fine_motor_skills_question_4_d_' + housefly[o] + '" name="fine_motor_skills_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="fine_motor_skills_question_4_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I can thread large beads/buttons together</td><td><form action="POST" class="col-11"><input type="radio" id="fine_motor_skills_question_5_a_' + housefly[o] + '" name="fine_motor_skills_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="fine_motor_skills_question_5_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="fine_motor_skills_question_5_b_' + housefly[o] + '" name="fine_motor_skills_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="fine_motor_skills_question_5_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="fine_motor_skills_question_5_c_' + housefly[o] + '" name="fine_motor_skills_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="fine_motor_skills_question_5_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="fine_motor_skills_question_5_d_' + housefly[o] + '" name="fine_motor_skills_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="fine_motor_skills_question_5_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I can fix objects(puzzles)</td><td><form action="POST" class="col-11"><input type="radio" id="fine_motor_skills_question_6_a_' + housefly[o] + '" name="fine_motor_skills_question_6_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="fine_motor_skills_question_6_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="fine_motor_skills_question_6_b_' + housefly[o] + '" name="fine_motor_skills_question_6_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="fine_motor_skills_question_6_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="fine_motor_skills_question_6_c_' + housefly[o] + '" name="fine_motor_skills_question_6_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="fine_motor_skills_question_6_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="fine_motor_skills_question_6_d_' + housefly[o] + '" name="fine_motor_skills_question_6_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="fine_motor_skills_question_6_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I can lace objects</td><td><form action="POST" class="col-11"><input type="radio" id="fine_motor_skills_question_7_a_' + housefly[o] + '" name="fine_motor_skills_question_7_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="fine_motor_skills_question_7_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="fine_motor_skills_question_7_b_' + housefly[o] + '" name="fine_motor_skills_question_7_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="fine_motor_skills_question_7_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="fine_motor_skills_question_7_c_' + housefly[o] + '" name="fine_motor_skills_question_7_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="fine_motor_skills_question_7_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="fine_motor_skills_question_7_d_' + housefly[o] + '" name="fine_motor_skills_question_7_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="fine_motor_skills_question_7_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I can use scissors</td><td><form action="POST" class="col-11"><input type="radio" id="fine_motor_skills_question_8_a_' + housefly[o] + '" name="fine_motor_skills_question_8_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="fine_motor_skills_question_8_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="fine_motor_skills_question_8_b_' + housefly[o] + '" name="fine_motor_skills_question_8_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="fine_motor_skills_question_8_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="fine_motor_skills_question_8_c_' + housefly[o] + '" name="fine_motor_skills_question_8_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="fine_motor_skills_question_8_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="fine_motor_skills_question_8_d_' + housefly[o] + '" name="fine_motor_skills_question_8_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="fine_motor_skills_question_8_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody></table><br><div class="row col-12 ml-1"><input type="button" name="PREVIOUS" id="nurresultpreviousbtn" class="btn btn-outline-success col-1" value="PREVIOUS"><div class="col-10"></div><input type="button" name="NEXT" id="nurresultsavebtn" class="btn btn-outline-success col-1" value="NEXT"></div></div></div>');
                            //let nurresultContents = document.getElementById("unique_card_1");
                            //nurresultContents.classList.add("active");
                            if (chicken[z] == 'A') {
                                document.getElementById('fine_motor_skills_question_1_a_' + housefly[o]).checked = true;
                            } else if (chicken[z] == 'B') {
                                document.getElementById('fine_motor_skills_question_1_b_' + housefly[o]).checked = true;
                            } else if (chicken[z] == 'C') {
                                document.getElementById('fine_motor_skills_question_1_c_' + housefly[o]).checked = true;
                            } else if (chicken[z] == 'D') {
                                document.getElementById('fine_motor_skills_question_1_d_' + housefly[o]).checked = true;
                            }


                            if (fowl[x] == 'A') {
                                document.getElementById('fine_motor_skills_question_2_a_' + housefly[o]).checked = true;
                            } else if (fowl[x] == 'B') {
                                document.getElementById('fine_motor_skills_question_2_b_' + housefly[o]).checked = true;
                            } else if (fowl[x] == 'C') {
                                document.getElementById('fine_motor_skills_question_2_c_' + housefly[o]).checked = true;
                            } else if (fowl[x] == 'D') {
                                document.getElementById('fine_motor_skills_question_2_d_' + housefly[o]).checked = true;
                            }

                            if (cow[b] == 'A') {
                                document.getElementById('fine_motor_skills_question_3_a_' + housefly[o]).checked = true;
                            } else if (cow[b] == 'B') {
                                document.getElementById('fine_motor_skills_question_3_b_' + housefly[o]).checked = true;
                            } else if (cow[b] == 'C') {
                                document.getElementById('fine_motor_skills_question_3_c_' + housefly[o]).checked = true;
                            } else if (cow[b] == 'D') {
                                document.getElementById('fine_motor_skills_question_3_d_' + housefly[o]).checked = true;
                            }

                            if (sheep[c] == 'A') {
                                document.getElementById('fine_motor_skills_question_4_a_' + housefly[o]).checked = true;
                            } else if (sheep[c] == 'B') {
                                document.getElementById('fine_motor_skills_question_4_b_' + housefly[o]).checked = true;
                            } else if (sheep[c] == 'C') {
                                document.getElementById('fine_motor_skills_question_4_c_' + housefly[o]).checked = true;
                            } else if (sheep[c] == 'D') {
                                document.getElementById('fine_motor_skills_question_4_d_' + housefly[o]).checked = true;
                            }

                            if (goat[d] == 'A') {
                                document.getElementById('fine_motor_skills_question_5_a_' + housefly[o]).checked = true;
                            } else if (goat[d] == 'B') {
                                document.getElementById('fine_motor_skills_question_5_b_' + housefly[o]).checked = true;
                            } else if (goat[d] == 'C') {
                                document.getElementById('fine_motor_skills_question_5_c_' + housefly[o]).checked = true;
                            } else if (goat[d] == 'D') {
                                document.getElementById('fine_motor_skills_question_5_d_' + housefly[o]).checked = true;
                            }

                            if (snake[f] == 'A') {
                                document.getElementById('fine_motor_skills_question_6_a_' + housefly[o]).checked = true;
                            } else if (snake[f] == 'B') {
                                document.getElementById('fine_motor_skills_question_6_b_' + housefly[o]).checked = true;
                            } else if (snake[f] == 'C') {
                                document.getElementById('fine_motor_skills_question_6_c_' + housefly[o]).checked = true;
                            } else if (snake[f] == 'D') {
                                document.getElementById('fine_motor_skills_question_6_d_' + housefly[o]).checked = true;
                            }

                            if (rabbit[g] == 'A') {
                                document.getElementById('fine_motor_skills_question_7_a_' + housefly[o]).checked = true;
                            } else if (rabbit[g] == 'B') {
                                document.getElementById('fine_motor_skills_question_7_b_' + housefly[o]).checked = true;
                            } else if (rabbit[g] == 'C') {
                                document.getElementById('fine_motor_skills_question_7_c_' + housefly[o]).checked = true;
                            } else if (rabbit[g] == 'D') {
                                document.getElementById('fine_motor_skills_question_7_d_' + housefly[o]).checked = true;
                            }

                            if (chic[h] == 'A') {
                                document.getElementById('fine_motor_skills_question_8_a_' + housefly[o]).checked = true;
                            } else if (chic[h] == 'B') {
                                document.getElementById('fine_motor_skills_question_8_b_' + housefly[o]).checked = true;
                            } else if (chic[h] == 'C') {
                                document.getElementById('fine_motor_skills_question_8_c_' + housefly[o]).checked = true;
                            } else if (chic[h] == 'D') {
                                document.getElementById('fine_motor_skills_question_8_d_' + housefly[o]).checked = true;
                            }
                        } else if (selected_nurresulsubjectinput1 == 'GROSS MOTOR SKILLS') {
                            $(".nurresultlistlist2").append('<div class="card" id="unique_card_' + housefly[o] + '"><div class="card-body"><h5>' + fish[y] + '</h5><h6>' + housefly[o] + '</h6><br><h7>' + selected_nurresulsubjectinput1 + '</h7><br><br><table class="table"><tbody><td>QUESTIONS</td><td>GRADES</td></tbody><tbody><td>I can co-ordinate my body movements</td><td><form action="POST" class="col-11"><input type="radio" id="gross_motor_skills_question_1_a_' + housefly[o] + '" name="gross_motor_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="gross_motor_skills_question_1_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="gross_motor_skills_question_1_b_' + housefly[o] + '" name="gross_motor_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="gross_motor_skills_question_1_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="gross_motor_skills_question_1_c_' + housefly[o] + '" name="gross_motor_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="gross_motor_skills_question_1_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="gross_motor_skills_question_1_d_' + housefly[o] + '" name="gross_motor_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="gross_motor_skills_question_1_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I like outdoor play</td><td><form action="POST" class="col-11"><input type="radio" id="gross_motor_skills_question_2_a_' + housefly[o] + '" name="gross_motor_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="gross_motor_skills_question_2_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="gross_motor_skills_question_2_b_' + housefly[o] + '" name="gross_motor_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="gross_motor_skills_question_2_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="gross_motor_skills_question_2_c_' + housefly[o] + '" name="gross_motor_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="gross_motor_skills_question_2_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="gross_motor_skills_question_2_d_' + housefly[o] + '" name="gross_motor_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="gross_motor_skills_question_2_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I dance and play games</td><td><form action="POST" class="col-11"><input type="radio" id="gross_motor_skills_question_3_a_' + housefly[o] + '" name="gross_motor_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="gross_motor_skills_question_3_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="gross_motor_skills_question_3_b_' + housefly[o] + '" name="gross_motor_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="gross_motor_skills_question_3_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="gross_motor_skills_question_3_c_' + housefly[o] + '" name="gross_motor_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="gross_motor_skills_question_3_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="gross_motor_skills_question_3_d_' + housefly[o] + '" name="gross_motor_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="gross_motor_skills_question_3_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody></table><br><div class="row col-12 ml-1"><input type="button" name="PREVIOUS" id="nurresultpreviousbtn" class="btn btn-outline-success col-1" value="PREVIOUS"><div class="col-10"></div><input type="button" name="NEXT" id="nurresultsavebtn" class="btn btn-outline-success col-1" value="NEXT"></div></div></div>');
                            //let nurresultContents = document.getElementById("unique_card_1");
                            //nurresultContents.classList.add("active");
                            if (chicken[z] == 'A') {
                                document.getElementById('gross_motor_skills_question_1_a_' + housefly[o]).checked = true;
                            } else if (chicken[z] == 'B') {
                                document.getElementById('gross_motor_skills_question_1_b_' + housefly[o]).checked = true;
                            } else if (chicken[z] == 'C') {
                                document.getElementById('gross_motor_skills_question_1_c_' + housefly[o]).checked = true;
                            } else if (chicken[z] == 'D') {
                                document.getElementById('gross_motor_skills_question_1_d_' + housefly[o]).checked = true;
                            }


                            if (fowl[x] == 'A') {
                                document.getElementById('gross_motor_skills_question_2_a_' + housefly[o]).checked = true;
                            } else if (fowl[x] == 'B') {
                                document.getElementById('gross_motor_skills_question_2_b_' + housefly[o]).checked = true;
                            } else if (fowl[x] == 'C') {
                                document.getElementById('gross_motor_skills_question_2_c_' + housefly[o]).checked = true;
                            } else if (fowl[x] == 'D') {
                                document.getElementById('gross_motor_skills_question_2_d_' + housefly[o]).checked = true;
                            }

                            if (cow[b] == 'A') {
                                document.getElementById('gross_motor_skills_question_3_a_' + housefly[o]).checked = true;
                            } else if (cow[b] == 'B') {
                                document.getElementById('gross_motor_skills_question_3_b_' + housefly[o]).checked = true;
                            } else if (cow[b] == 'C') {
                                document.getElementById('gross_motor_skills_question_3_c_' + housefly[o]).checked = true;
                            } else if (cow[b] == 'D') {
                                document.getElementById('gross_motor_skills_question_3_d_' + housefly[o]).checked = true;
                            }
                        } else if (selected_nurresulsubjectinput1 == 'ICT SKILLS (COMPUTER)') {
                            $(".nurresultlistlist2").append('<div class="card" id="unique_card_' + housefly[o] + '"><div class="card-body"><h5>' + fish[y] + '</h5><h6>' + housefly[o] + '</h6><br><h7>' + selected_nurresulsubjectinput1 + '</h7><br><br><table class="table"><tbody><td>QUESTIONS</td><td>GRADES</td></tbody><tbody><td>I can identify the keyboard</td><td><form action="POST" class="col-11"><input type="radio" id="ict_skills_question_1_a_' + housefly[o] + '" name="ict_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="ict_skills_question_1_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="ict_skills_question_1_b_' + housefly[o] + '" name="ict_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="ict_skills_question_1_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="ict_skills_question_1_c_' + housefly[o] + '" name="ict_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="ict_skills_question_1_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="ict_skills_question_1_d_' + housefly[o] + '" name="ict_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="ict_skills_question_1_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I can match computer parts to their names</td><td><form action="POST" class="col-11"><input type="radio" id="ict_skills_question_2_a_' + housefly[o] + '" name="ict_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="ict_skills_question_2_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="ict_skills_question_2_b_' + housefly[o] + '" name="ict_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="ict_skills_question_2_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="ict_skills_question_2_c_' + housefly[o] + '" name="ict_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="ict_skills_question_2_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="ict_skills_question_2_d_' + housefly[o] + '" name="ict_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="ict_skills_question_2_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I can press the keys on the keyboard normally</td><td><form action="POST" class="col-11"><input type="radio" id="ict_skills_question_3_a_' + housefly[o] + '" name="ict_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="ict_skills_question_3_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="ict_skills_question_3_b_' + housefly[o] + '" name="ict_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="ict_skills_question_3_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="ict_skills_question_3_c_' + housefly[o] + '" name="ict_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="ict_skills_question_3_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="ict_skills_question_3_d_' + housefly[o] + '" name="ict_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="ict_skills_question_3_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody></table><br><div class="row col-12 ml-1"><input type="button" name="PREVIOUS" id="nurresultpreviousbtn" class="btn btn-outline-success col-1" value="PREVIOUS"><div class="col-10"></div><input type="button" name="NEXT" id="nurresultsavebtn" class="btn btn-outline-success col-1" value="NEXT"></div></div></div>');
                            //let nurresultContents = document.getElementById("unique_card_1");
                            //nurresultContents.classList.add("active");
                            if (chicken[z] == 'A') {
                                document.getElementById('ict_skills_question_1_a_' + housefly[o]).checked = true;
                            } else if (chicken[z] == 'B') {
                                document.getElementById('ict_skills_question_1_b_' + housefly[o]).checked = true;
                            } else if (chicken[z] == 'C') {
                                document.getElementById('ict_skills_question_1_c_' + housefly[o]).checked = true;
                            } else if (chicken[z] == 'D') {
                                document.getElementById('ict_skills_question_1_d_' + housefly[o]).checked = true;
                            }


                            if (fowl[x] == 'A') {
                                document.getElementById('ict_skills_question_2_a_' + housefly[o]).checked = true;
                            } else if (fowl[x] == 'B') {
                                document.getElementById('ict_skills_question_2_b_' + housefly[o]).checked = true;
                            } else if (fowl[x] == 'C') {
                                document.getElementById('ict_skills_question_2_c_' + housefly[o]).checked = true;
                            } else if (fowl[x] == 'D') {
                                document.getElementById('ict_skills_question_2_d_' + housefly[o]).checked = true;
                            }

                            if (cow[b] == 'A') {
                                document.getElementById('ict_skills_question_3_a_' + housefly[o]).checked = true;
                            } else if (cow[b] == 'B') {
                                document.getElementById('ict_skills_question_3_b_' + housefly[o]).checked = true;
                            } else if (cow[b] == 'C') {
                                document.getElementById('ict_skills_question_3_c_' + housefly[o]).checked = true;
                            } else if (cow[b] == 'D') {
                                document.getElementById('ict_skills_question_3_d_' + housefly[o]).checked = true;
                            }
                        } else if (selected_nurresulsubjectinput1 == 'RHYMES AND SONGS (MUSIC)') {
                            $(".nurresultlistlist2").append('<div class="card" id="unique_card_' + housefly[o] + '"><div class="card-body"><h5>' + fish[y] + '</h5><h6>' + housefly[o] + '</h6><br><h7>' + selected_nurresulsubjectinput1 + '</h7><br><br><table class="table"><tbody><td>QUESTIONS</td><td>GRADES</td></tbody><tbody><td>I can enjoy music</td><td><form action="POST" class="col-11"><input type="radio" id="music_question_1_a_' + housefly[o] + '" name="music_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="music_question_1_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="music_question_1_b_' + housefly[o] + '" name="music_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="music_question_1_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="music_question_1_c_' + housefly[o] + '" name="music_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="music_question_1_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="music_question_1_d_' + housefly[o] + '" name="music_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="music_question_1_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I can sing and say rhymes</td><td><form action="POST" class="col-11"><input type="radio" id="music_question_2_a_' + housefly[o] + '" name="music_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="music_question_2_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="music_question_2_b_' + housefly[o] + '" name="music_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="music_question_2_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="music_question_2_c_' + housefly[o] + '" name="music_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="music_question_2_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="music_question_2_d_' + housefly[o] + '" name="music_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="music_question_2_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I participate in group songs and rhymes</td><td><form action="POST" class="col-11"><input type="radio" id="music_question_3_a_' + housefly[o] + '" name="music_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="music_question_3_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="music_question_3_b_' + housefly[o] + '" name="music_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="music_question_3_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="music_question_3_c_' + housefly[o] + '" name="music_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="music_question_3_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="music_question_3_d_' + housefly[o] + '" name="music_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="music_question_3_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I respond to rhythmic patterns</td><td><form action="POST" class="col-11"><input type="radio" id="music_question_4_a_' + housefly[o] + '" name="music_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="music_question_4_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="music_question_4_b_' + housefly[o] + '" name="music_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="music_question_4_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="music_question_4_c_' + housefly[o] + '" name="music_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="music_question_4_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="music_question_4_d_' + housefly[o] + '" name="music_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="music_question_4_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I enjoy demonstrating rhymes and songs</td><td><form action="POST" class="col-11"><input type="radio" id="music_question_5_a_' + housefly[o] + '" name="music_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="music_question_5_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="music_question_5_b_' + housefly[o] + '" name="music_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="music_question_5_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="music_question_5_c_' + housefly[o] + '" name="music_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="music_question_5_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="music_question_5_d_' + housefly[o] + '" name="music_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="music_question_5_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody></table><br><div class="row col-12 ml-1"><input type="button" name="PREVIOUS" id="nurresultpreviousbtn" class="btn btn-outline-success col-1" value="PREVIOUS"><div class="col-10"></div><input type="button" name="NEXT" id="nurresultsavebtn" class="btn btn-outline-success col-1" value="NEXT"></div></div></div>');
                            //let nurresultContents = document.getElementById("unique_card_1");
                            //nurresultContents.classList.add("active");
                            if (chicken[z] == 'A') {
                                document.getElementById('music_question_1_a_' + housefly[o]).checked = true;
                            } else if (chicken[z] == 'B') {
                                document.getElementById('music_question_1_b_' + housefly[o]).checked = true;
                            } else if (chicken[z] == 'C') {
                                document.getElementById('music_question_1_c_' + housefly[o]).checked = true;
                            } else if (chicken[z] == 'D') {
                                document.getElementById('music_question_1_d_' + housefly[o]).checked = true;
                            }


                            if (fowl[x] == 'A') {
                                document.getElementById('music_question_2_a_' + housefly[o]).checked = true;
                            } else if (fowl[x] == 'B') {
                                document.getElementById('music_question_2_b_' + housefly[o]).checked = true;
                            } else if (fowl[x] == 'C') {
                                document.getElementById('music_question_2_c_' + housefly[o]).checked = true;
                            } else if (fowl[x] == 'D') {
                                document.getElementById('music_question_2_d_' + housefly[o]).checked = true;
                            }

                            if (cow[b] == 'A') {
                                document.getElementById('music_question_3_a_' + housefly[o]).checked = true;
                            } else if (cow[b] == 'B') {
                                document.getElementById('music_question_3_b_' + housefly[o]).checked = true;
                            } else if (cow[b] == 'C') {
                                document.getElementById('music_question_3_c_' + housefly[o]).checked = true;
                            } else if (cow[b] == 'D') {
                                document.getElementById('music_question_3_d_' + housefly[o]).checked = true;
                            }

                            if (sheep[c] == 'A') {
                                document.getElementById('music_question_4_a_' + housefly[o]).checked = true;
                            } else if (sheep[c] == 'B') {
                                document.getElementById('music_question_4_b_' + housefly[o]).checked = true;
                            } else if (sheep[c] == 'C') {
                                document.getElementById('music_question_4_c_' + housefly[o]).checked = true;
                            } else if (sheep[c] == 'D') {
                                document.getElementById('music_question_4_d_' + housefly[o]).checked = true;
                            }

                            if (goat[d] == 'A') {
                                document.getElementById('music_question_5_a_' + housefly[o]).checked = true;
                            } else if (goat[d] == 'B') {
                                document.getElementById('music_question_5_b_' + housefly[o]).checked = true;
                            } else if (goat[d] == 'C') {
                                document.getElementById('music_question_5_c_' + housefly[o]).checked = true;
                            } else if (goat[d] == 'D') {
                                document.getElementById('music_question_5_d_' + housefly[o]).checked = true;
                            }
                        } else if (selected_nurresulsubjectinput1 == 'WRITING SKILLS') {
                            $(".nurresultlistlist2").append('<div class="card" id="unique_card_' + housefly[o] + '"><div class="card-body"><h5>' + fish[y] + '</h5><h6>' + housefly[o] + '</h6><br><h7>' + selected_nurresulsubjectinput1 + '</h7><br><br><table class="table"><tbody><td>QUESTIONS</td><td>GRADES</td></tbody><tbody><td>I can recognize beginning letter sounds <input type="text" class="form-control" id="writing_skills_question_1_first_input_' + housefly[o] + '" style="width:105px!important;" value="' + front9[bb] + '"> to <input type="text" class="form-control" id="writing_skills_question_1_second_input_' + housefly[o] + '" style="width:105px!important;" value="' + front10[aa] + '"></td><td><form action="POST" class="col-11"><input type="radio" id="writing_skills_question_1_a_' + housefly[o] + '" name="writing_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="writing_skills_question_1_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="writing_skills_question_1_b_' + housefly[o] + '" name="writing_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="writing_skills_question_1_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="writing_skills_question_1_c_' + housefly[o] + '" name="writing_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="writing_skills_question_1_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="writing_skills_question_1_d_' + housefly[o] + '" name="writing_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="writing_skills_question_1_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I can sound and write letter sounds <input type="text" class="form-control" id="writing_skills_question_2_first_input_' + housefly[o] + '" style="width:105px!important;" value="' + front11[cc] + '"> to <input type="text" class="form-control" id="writing_skills_question_2_second_input_' + housefly[o] + '" style="width:105px!important;" value="' + front12[dd] + '"></td><td><form action="POST" class="col-11"><input type="radio" id="writing_skills_question_2_a_' + housefly[o] + '" name="writing_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="writing_skills_question_2_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="writing_skills_question_2_b_' + housefly[o] + '" name="writing_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="writing_skills_question_2_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="writing_skills_question_2_c_' + housefly[o] + '" name="writing_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="writing_skills_question_2_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="writing_skills_question_2_d_' + housefly[o] + '" name="writing_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="writing_skills_question_2_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I can sound and recognise diagrams</td><td><form action="POST" class="col-11"><input type="radio" id="writing_skills_question_3_a_' + housefly[o] + '" name="writing_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="writing_skills_question_3_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="writing_skills_question_3_b_' + housefly[o] + '" name="writing_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="writing_skills_question_3_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="writing_skills_question_3_c_' + housefly[o] + '" name="writing_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="writing_skills_question_3_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="writing_skills_question_3_d_' + housefly[o] + '" name="writing_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="writing_skills_question_3_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I can blend two letter words</td><td><form action="POST" class="col-11"><input type="radio" id="writing_skills_question_4_a_' + housefly[o] + '" name="writing_skills_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="writing_skills_question_4_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="writing_skills_question_4_b_' + housefly[o] + '" name="writing_skills_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="writing_skills_question_4_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="writing_skills_question_4_c_' + housefly[o] + '" name="writing_skills_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="writing_skills_question_4_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="writing_skills_question_4_d_' + housefly[o] + '" name="writing_skills_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="writing_skills_question_4_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody></table><br><div class="row col-12 ml-1"><input type="button" name="PREVIOUS" id="nurresultpreviousbtn" class="btn btn-outline-success col-1" value="PREVIOUS"><div class="col-10"></div><input type="button" name="NEXT" id="nurresultsavebtn" class="btn btn-outline-success col-1" value="NEXT"></div></div></div>');
                            //let nurresultContents = document.getElementById("unique_card_1");
                            //nurresultContents.classList.add("active");
                            if (chicken[z] == 'A') {
                                document.getElementById('writing_skills_question_1_a_' + housefly[o]).checked = true;
                            } else if (chicken[z] == 'B') {
                                document.getElementById('writing_skills_question_1_b_' + housefly[o]).checked = true;
                            } else if (chicken[z] == 'C') {
                                document.getElementById('writing_skills_question_1_c_' + housefly[o]).checked = true;
                            } else if (chicken[z] == 'D') {
                                document.getElementById('writing_skills_question_1_d_' + housefly[o]).checked = true;
                            }


                            if (fowl[x] == 'A') {
                                document.getElementById('writing_skills_question_2_a_' + housefly[o]).checked = true;
                            } else if (fowl[x] == 'B') {
                                document.getElementById('writing_skills_question_2_b_' + housefly[o]).checked = true;
                            } else if (fowl[x] == 'C') {
                                document.getElementById('writing_skills_question_2_c_' + housefly[o]).checked = true;
                            } else if (fowl[x] == 'D') {
                                document.getElementById('writing_skills_question_2_d_' + housefly[o]).checked = true;
                            }

                            if (cow[b] == 'A') {
                                document.getElementById('writing_skills_question_3_a_' + housefly[o]).checked = true;
                            } else if (cow[b] == 'B') {
                                document.getElementById('writing_skills_question_3_b_' + housefly[o]).checked = true;
                            } else if (cow[b] == 'C') {
                                document.getElementById('writing_skills_question_3_c_' + housefly[o]).checked = true;
                            } else if (cow[b] == 'D') {
                                document.getElementById('writing_skills_question_3_d_' + housefly[o]).checked = true;
                            }

                            if (sheep[c] == 'A') {
                                document.getElementById('writing_skills_question_4_a_' + housefly[o]).checked = true;
                            } else if (sheep[c] == 'B') {
                                document.getElementById('writing_skills_question_4_b_' + housefly[o]).checked = true;
                            } else if (sheep[c] == 'C') {
                                document.getElementById('writing_skills_question_4_c_' + housefly[o]).checked = true;
                            } else if (sheep[c] == 'D') {
                                document.getElementById('writing_skills_question_4_d_' + housefly[o]).checked = true;
                            }

                            
                        }
                        
                        
                    }
                    }
                    
                    var vickky = document.querySelectorAll(".nurresultlistlist .studentresultcontent > div");
                    for (let nun=0; nun<vickky.length; nun++) {
                        vickky[nun].setAttribute('data-id', nun);
                        vickky[0].classList.add('active')
                    }

                    
                   
                    
                    $("#nurresultlist2").on('click', '#nurresultsavebtn', function() {
                        console.log('buhh')
                        var one = $("#nurresultsessionslistdropdown").val();
                        var two = $("#nurresultsectionlistdropdown").val();
                        var three = $("#nurresultclasslistdropdown"). val();
                        var four = $("#nurresulttermlistdropdown").val();
                        var five = $("#nurresultsubjectlistdropdown").val();
                        var six = $(".nurresultlistlist .studentresultcontent .active .card-body > h5 ").text();
                        var identity = $(".nurresultlistlist .studentresultcontent .active .card-body > h6 ").text();
                        var csrftoken = $("#nursery_result > input[name=csrfmiddlewaretoken]").val();

                        if (five == 'NUMERACY') {
                            var seven = $("input[name='numeracy_question_1_" + identity + "']:checked").val();
                            var eight = $("input[name='numeracy_question_2_" + identity + "']:checked").val();
                            var nine = $("input[name='numeracy_question_3_" + identity + "']:checked").val();
                            var ten = $("input[name='numeracy_question_4_" + identity + "']:checked").val();
                            var eleven = $("input[name='numeracy_question_5_" + identity + "']:checked").val();
                            var fifth = $("#numeracy_question_1_first_input_" + identity + "").val();
                            var sixth = $("#numeracy_question_1_second_input_" + identity + "").val();
                            var seventh = $("#numeracy_question_2_first_input_" + identity + "").val();
                            var eighth = $("#numeracy_question_2_second_input_" + identity + "").val();
                            var nineth = $("#numeracy_question_3_input_" + identity + "").val();
                            var tenth = $("#numeracy_question_4_input_" + identity + "").val();
                            var eleventh = $("#numeracy_question_5_first_input_" + identity + "").val();
                            var twelfth = $("#numeracy_question_5_second_input_" + identity + "").val();
                        } else if (five == 'LITERACY') {
                            var seven = $("input[name='literacy_question_1_" + identity + "']:checked").val();
                            var eight = $("input[name='literacy_question_2_" + identity + "']:checked").val();
                            var nine = $("input[name='literacy_question_3_" + identity + "']:checked").val();
                            var ten = $("input[name='literacy_question_4_" + identity + "']:checked").val();
                            var eleven = $("input[name='literacy_question_5_" + identity + "']:checked").val();
                            var twelve = $("input[name='literacy_question_6_" + identity + "']:checked").val();
                            var thirteen = $("input[name='literacy_question_7_" + identity + "']:checked").val();
                            var fourteen = $("input[name='literacy_question_8_" + identity + "']:checked").val();
                        } else if (five == 'ICT SKILLS (COMPUTER)') {
                            var seven = $("input[name='ict_skills_question_1_" + identity + "']:checked").val();
                            var eight = $("input[name='ict_skills_question_2_" + identity + "']:checked").val();
                            var nine = $("input[name='ict_skills_question_3_" + identity + "']:checked").val();
                        } else if (five == 'EMOTIONAL SKILLS') {
                            var seven = $("input[name='emotional_skills_question_1_" + identity + "']:checked").val();
                            var eight = $("input[name='emotional_skills_question_2_" + identity + "']:checked").val();
                            var nine = $("input[name='emotional_skills_question_3_" + identity + "']:checked").val();
                            var ten = $("input[name='emotional_skills_question_4_" + identity + "']:checked").val();
                        } else if (five == 'FINE MOTOR SKILLS') {
                            var seven = $("input[name='fine_motor_skills_question_1_" + identity + "']:checked").val();
                            var eight = $("input[name='fine_motor_skills_question_2_" + identity + "']:checked").val();
                            var nine = $("input[name='fine_motor_skills_question_3_" + identity + "']:checked").val();
                            var ten = $("input[name='fine_motor_skills_question_4_" + identity + "']:checked").val();
                            var eleven = $("input[name='fine_motor_skills_question_5_" + identity + "']:checked").val();
                            var twelve = $("input[name='fine_motor_skills_question_6_" + identity + "']:checked").val();
                            var thirteen = $("input[name='fine_motor_skills_question_7_" + identity + "']:checked").val();
                            var fourteen = $("input[name='fine_motor_skills_question_8_" + identity + "']:checked").val();
                        } else if (five == 'GROSS MOTOR SKILLS') {
                            var seven = $("input[name='gross_motor_skills_question_1_" + identity + "']:checked").val();
                            var eight = $("input[name='gross_motor_skills_question_2_" + identity + "']:checked").val();
                            var nine = $("input[name='gross_motor_skills_question_3_" + identity + "']:checked").val();
                        } else if (five == 'RHYMES AND SONGS (MUSIC)') {
                            var seven = $("input[name='music_question_1_" + identity + "']:checked").val();
                            var eight = $("input[name='music_question_2_" + identity + "']:checked").val();
                            var nine = $("input[name='music_question_3_" + identity + "']:checked").val();
                            var ten = $("input[name='music_question_4_" + identity + "']:checked").val();
                            var eleven = $("input[name='music_question_5_" + identity + "']:checked").val();
                        } else if (five == 'SOCIAL SKILLS') {
                            var seven = $("input[name='social_skills_question_1_" + identity + "']:checked").val();
                            var eight = $("input[name='social_skills_question_2_" + identity + "']:checked").val();
                            var nine = $("input[name='social_skills_question_3_" + identity + "']:checked").val();
                            var ten = $("input[name='social_skills_question_4_" + identity + "']:checked").val();
                            var eleven = $("input[name='social_skills_question_5_" + identity + "']:checked").val();
                            var twelve = $("input[name='social_skills_question_6_" + identity + "']:checked").val();
                            var thirteen = $("input[name='social_skills_question_7_" + identity + "']:checked").val();
                            var fourteen = $("input[name='social_skills_question_8_" + identity + "']:checked").val();
                            var fifteen = $("input[name='social_skills_question_9_" + identity + "']:checked").val();
                            var sixteen = $("input[name='social_skills_question_10_" + identity + "']:checked").val();
                            var seventeen = $("input[name='social_skills_question_11_" + identity + "']:checked").val();
                            var eighteen = $("input[name='social_skills_question_12_" + identity + "']:checked").val();
                        } else if (five == 'WRITING SKILLS') {
                            var seven = $("input[name='writing_skills_question_1_" + identity + "']:checked").val();
                            var eight = $("input[name='writing_skills_question_2_" + identity + "']:checked").val();
                            var nine = $("input[name='writing_skills_question_3_" + identity + "']:checked").val();
                            var ten = $("input[name='writing_skills_question_4_" + identity + "']:checked").val();
                            var first = $("#writing_skills_question_1_first_input_" + identity + "").val();
                            var second = $("#writing_skills_question_1_second_input_" + identity + "").val();
                            var third = $("#writing_skills_question_2_first_input_" + identity + "").val();
                            var fourth = $("#writing_skills_question_2_second_input_" + identity + "").val();
                        }
                        

                        console.log(one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, first, second, third, fourth, fifth, sixth, seventh, eighth, nineth, tenth, eleventh, twelfth, identity)

                        $.ajax({
                            type: "POST",
                            url: `result/update/${identity}/`,
                            data: {
                                csrfmiddlewaretoken:csrftoken,
                                session_name:one,
                                section_name:two,
                                class_name:three,
                                term_name:four,
                                subject_name:five,
                                student_full_name:six,
                                question1: seven,
                                question2: eight,
                                question3: nine,
                                question4: ten,
                                question5: eleven,
                                question6: twelve,
                                question7: thirteen,
                                question8: fourteen,
                                question9: fifteen,
                                question10: sixteen,
                                question11: seventeen,
                                question12: eighteen,
                                numeracy1: fifth,
                                numeracy2: sixth,
                                numeracy3: seventh,
                                numeracy4: eighth,
                                numeracy5: nineth,
                                numeracy6: tenth,
                                numeracy7: eleventh,
                                numeracy8: twelfth,
                                writing1: first,
                                writing2: second,
                                writing3: third,
                                writing4: fourth,
                            },
                
                            success: function(response) {
                                
                                document.querySelector(".tabs .tab-content .actives").scrollTo(0, 250);
                                var ninni = $('.active').data('id');
                                
                                if (ninni == vickky.length - 1) {
                                    var pluu = vickky.length - 1;
                                } else if (ninni < vickky.length) {
                                    var pluu = ninni + 1; 
                                }
                                console.log(pluu)
                                document.querySelector(".nurresultlistlist .studentresultcontent .active").classList.remove("active");
                                vickky[pluu].classList.add("active");
                                
                                
                            }
                        });
    
                        
                    });
                    let tabContents4 = document.querySelectorAll(".nurresultlistlist .studentresultcontent > div");
                    count = tabContents4.length;
                    $("#nurresultlist2").on('click', '#nurresultpreviousbtn', function() {

                        var one = $("#nurresultsessionslistdropdown").val();
                        var two = $("#nurresultsectionlistdropdown").val();
                        var three = $("#nurresultclasslistdropdown").val();
                        var four = $("#nurresulttermlistdropdown").val();
                        var five = $("#nurresultsubjectlistdropdown").val();
                        var six = $(".nurresultlistlist .studentresultcontent .active .card-body > h5 ").text();
                        var identity = $(".nurresultlistlist .studentresultcontent .active .card-body > h6 ").text();
                        var csrftoken = $("#nursery_result > input[name=csrfmiddlewaretoken]").val();

                        if (five == 'NUMERACY') {
                            var seven = $("input[name='numeracy_question_1_" + identity + "']:checked").val();
                            var eight = $("input[name='numeracy_question_2_" + identity + "']:checked").val();
                            var nine = $("input[name='numeracy_question_3_" + identity + "']:checked").val();
                            var ten = $("input[name='numeracy_question_4_" + identity + "']:checked").val();
                            var eleven = $("input[name='numeracy_question_5_" + identity + "']:checked").val();
                            var fifth = $("#numeracy_question_1_first_input_" + identity + "").val();
                            var sixth = $("#numeracy_question_1_second_input_" + identity + "").val();
                            var seventh = $("#numeracy_question_2_first_input_" + identity + "").val();
                            var eighth = $("#numeracy_question_2_second_input_" + identity + "").val();
                            var nineth = $("#numeracy_question_3_input_" + identity + "").val();
                            var tenth = $("#numeracy_question_4_input_" + identity + "").val();
                            var eleventh = $("#numeracy_question_5_first_input_" + identity + "").val();
                            var twelfth = $("#numeracy_question_5_second_input_" + identity + "").val();
                        } else if (five == 'LITERACY') {
                            var seven = $("input[name='literacy_question_1_" + identity + "']:checked").val();
                            var eight = $("input[name='literacy_question_2_" + identity + "']:checked").val();
                            var nine = $("input[name='literacy_question_3_" + identity + "']:checked").val();
                            var ten = $("input[name='literacy_question_4_" + identity + "']:checked").val();
                            var eleven = $("input[name='literacy_question_5_" + identity + "']:checked").val();
                            var twelve = $("input[name='literacy_question_6_" + identity + "']:checked").val();
                            var thirteen = $("input[name='literacy_question_7_" + identity + "']:checked").val();
                            var fourteen = $("input[name='literacy_question_8_" + identity + "']:checked").val();
                        } else if (five == 'ICT SKILLS (COMPUTER)') {
                            var seven = $("input[name='ict_skills_question_1_" + identity + "']:checked").val();
                            var eight = $("input[name='ict_skills_question_2_" + identity + "']:checked").val();
                            var nine = $("input[name='ict_skills_question_3_" + identity + "']:checked").val();
                        } else if (five == 'EMOTIONAL SKILLS') {
                            var seven = $("input[name='emotional_skills_question_1_" + identity + "']:checked").val();
                            var eight = $("input[name='emotional_skills_question_2_" + identity + "']:checked").val();
                            var nine = $("input[name='emotional_skills_question_3_" + identity + "']:checked").val();
                            var ten = $("input[name='emotional_skills_question_4_" + identity + "']:checked").val();
                        } else if (five == 'FINE MOTOR SKILLS') {
                            var seven = $("input[name='fine_motor_skills_question_1_" + identity + "']:checked").val();
                            var eight = $("input[name='fine_motor_skills_question_2_" + identity + "']:checked").val();
                            var nine = $("input[name='fine_motor_skills_question_3_" + identity + "']:checked").val();
                            var ten = $("input[name='fine_motor_skills_question_4_" + identity + "']:checked").val();
                            var eleven = $("input[name='fine_motor_skills_question_5_" + identity + "']:checked").val();
                            var twelve = $("input[name='fine_motor_skills_question_6_" + identity + "']:checked").val();
                            var thirteen = $("input[name='fine_motor_skills_question_7_" + identity + "']:checked").val();
                            var fourteen = $("input[name='fine_motor_skills_question_8_" + identity + "']:checked").val();
                        } else if (five == 'GROSS MOTOR SKILLS') {
                            var seven = $("input[name='gross_motor_skills_question_1_" + identity + "']:checked").val();
                            var eight = $("input[name='gross_motor_skills_question_2_" + identity + "']:checked").val();
                            var nine = $("input[name='gross_motor_skills_question_3_" + identity + "']:checked").val();
                        } else if (five == 'RHYMES AND SONGS (MUSIC)') {
                            var seven = $("input[name='music_question_1_" + identity + "']:checked").val();
                            var eight = $("input[name='music_question_2_" + identity + "']:checked").val();
                            var nine = $("input[name='music_question_3_" + identity + "']:checked").val();
                            var ten = $("input[name='music_question_4_" + identity + "']:checked").val();
                            var eleven = $("input[name='music_question_5_" + identity + "']:checked").val();
                        } else if (five == 'SOCIAL SKILLS') {
                            var seven = $("input[name='social_skills_question_1_" + identity + "']:checked").val();
                            var eight = $("input[name='social_skills_question_2_" + identity + "']:checked").val();
                            var nine = $("input[name='social_skills_question_3_" + identity + "']:checked").val();
                            var ten = $("input[name='social_skills_question_4_" + identity + "']:checked").val();
                            var eleven = $("input[name='social_skills_question_5_" + identity + "']:checked").val();
                            var twelve = $("input[name='social_skills_question_6_" + identity + "']:checked").val();
                            var thirteen = $("input[name='social_skills_question_7_" + identity + "']:checked").val();
                            var fourteen = $("input[name='social_skills_question_8_" + identity + "']:checked").val();
                            var fifteen = $("input[name='social_skills_question_9_" + identity + "']:checked").val();
                            var sixteen = $("input[name='social_skills_question_10_" + identity + "']:checked").val();
                            var seventeen = $("input[name='social_skills_question_11_" + identity + "']:checked").val();
                            var eighteen = $("input[name='social_skills_question_12_" + identity + "']:checked").val();
                        } else if (five == 'WRITING SKILLS') {
                            var seven = $("input[name='writing_skills_question_1_" + identity + "']:checked").val();
                            var eight = $("input[name='writing_skills_question_2_" + identity + "']:checked").val();
                            var nine = $("input[name='writing_skills_question_3_" + identity + "']:checked").val();
                            var ten = $("input[name='writing_skills_question_4_" + identity + "']:checked").val();
                            var first = $("#writing_skills_question_1_first_input_" + identity + "").val();
                            var second = $("#writing_skills_question_1_second_input_" + identity + "").val();
                            var third = $("#writing_skills_question_2_first_input_" + identity + "").val();
                            var fourth = $("#writing_skills_question_2_second_input_" + identity + "").val();
                        }
                        

                        console.log(one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, first, second, third, fourth, fifth, sixth, seventh, eighth, nineth, tenth, eleventh, twelfth, identity, csrftoken)

                        $.ajax({
                            type: "POST",
                            url: `result/update/${identity}/`,
                            data: {
                                csrfmiddlewaretoken:csrftoken,
                                session_name:one,
                                section_name:two,
                                class_name:three,
                                term_name:four,
                                subject_name:five,
                                student_full_name:six,
                                question1: seven,
                                question2: eight,
                                question3: nine,
                                question4: ten,
                                question5: eleven,
                                question6: twelve,
                                question7: thirteen,
                                question8: fourteen,
                                question9: fifteen,
                                question10: sixteen,
                                question11: seventeen,
                                question12: eighteen,
                                numeracy1: fifth,
                                numeracy2: sixth,
                                numeracy3: seventh,
                                numeracy4: eighth,
                                numeracy5: nineth,
                                numeracy6: tenth,
                                numeracy7: eleventh,
                                numeracy8: twelfth,
                                writing1: first,
                                writing2: second,
                                writing3: third,
                                writing4: fourth,
                            },
                
                            success: function(response) {
                                document.querySelector(".tabs .tab-content .actives").scrollTo(0, 250);
                                var billi = $('.active').data('id');
                                
                                if (billi == 0) {
                                    var plpp = 0;
                                } else if (billi < vickky.length) {
                                    var plpp = billi - 1; 
                                }
                                console.log(plpp)
                                document.querySelector(".nurresultlistlist .studentresultcontent .active").classList.remove("active");
                                vickky[plpp].classList.add("active");
                                
                                
                            }
                        });
    
                        
                    });

                    
                    
                    
                },
                error: function(error){
                    console.log(error)
                }
            });
        })

        

        
            

    const studentsessioninput1 = document.getElementById('studentsessionslistdropdown');
    const studentsectiondropdown = document.getElementById('studentsectionlistdropdown');

    studentsessioninput1.addEventListener('change', e=>{
        console.log(e.target.value)
        const selected_studentsessioninput1 = e.target.value
        
        studentsectiondropdown.innerHTML = ""

        $.ajax({
            type:'GET',
            url: `subject/section/${selected_studentsessioninput1}/`,
            success: function(response){
                console.log(response.data2)
                const option2 = document.createElement('option')
                option2.textContent = "Choose a Section"
                option2.setAttribute('hidden', true)
                option2.setAttribute('selected', true)
                option2.setAttribute('disabled', true)
                studentsectiondropdown.appendChild(option2)
                const data = response.data2
                data.map(item=>{
                    const option = document.createElement('option')
                    const option2 = document.createElement('option')
                    option.textContent = item.section_name
                    option2.textContent = "Choose a Section"
                    option.setAttribute('value', item.section_name)
                    option.setAttribute('id', item.id)
                    option2.setAttribute('hidden', true)
                    option2.setAttribute('selected', true)
                    option2.setAttribute('disabled', true)
                    studentsectiondropdown.appendChild(option)
                    studentsectiondropdown.appendChild(option2)
                })
                
            },
            error: function(error){
                console.log(error)
            }
         });
    })



    const studentsectioninput1 = document.getElementById('studentsectionlistdropdown');
    const studentclassdropdown = document.getElementById('studentclasslistdropdown');

    studentsectioninput1.addEventListener('change', e=>{
        console.log(e.target.value)
        const selected_studentsectioninput1 = e.target.value
        const val = $('#studentsessionslistdropdown').val();
        console.log(val)
        
        studentclassdropdown.innerHTML = ""

        $.ajax({
            type:'GET',
            url: `subject/class/${selected_studentsectioninput1}/${val}/`,
            success: function(response){
                console.log(response.data3)
                const option2 = document.createElement('option')
                option2.textContent = "Choose a Class"
                option2.setAttribute('hidden', true)
                option2.setAttribute('selected', true)
                option2.setAttribute('disabled', true)
                studentclassdropdown.appendChild(option2)
                const data = response.data3
                data.map(item=>{
                    const option = document.createElement('option')
                    const option2 = document.createElement('option')
                    option.textContent = item.class_name
                    option2.textContent = "Choose a Class"
                    option.setAttribute('value', item.class_name)
                    option.setAttribute('id', item.id)
                    option2.setAttribute('hidden', true)
                    option2.setAttribute('selected', true)
                    option2.setAttribute('disabled', true)
                    studentclassdropdown.appendChild(option)
                    studentclassdropdown.appendChild(option2)
                })
                
            },
            error: function(error){
                console.log(error)
            }
         });
    })



    const studentclassinput1 = document.getElementById('studentclasslistdropdown');
    const studenttermdropdown = document.getElementById('studenttermlistdropdown');

    studentclassinput1.addEventListener('change', e=>{
        console.log(e.target.value)
        
        studenttermdropdown.innerHTML = ""

        const option2 = document.createElement('option')
        option2.textContent = "Choose a Term"
        option2.setAttribute('hidden', true)
        option2.setAttribute('selected', true)
        option2.setAttribute('disabled', true)
        studenttermdropdown.appendChild(option2)

        const option = document.createElement('option')
        option.textContent = 'FIRST TERM'
        option.setAttribute('value', 'FIRST TERM')
        option.setAttribute('id', '')
        studenttermdropdown.appendChild(option)

        const option3 = document.createElement('option')
        option3.textContent = 'SECOND TERM'
        option3.setAttribute('value', 'SECOND TERM')
        option3.setAttribute('id', '')
        studenttermdropdown.appendChild(option3)

        const option4 = document.createElement('option')
        option4.textContent = 'THIRD TERM'
        option4.setAttribute('value', 'THIRD TERM')
        option4.setAttribute('id', '')
        studenttermdropdown.appendChild(option4)

       
    })
        });

        
    };


    var input = $("input[name=input]")
    var sessionsectioninput = $("input[name=sessionsectioninput]")
    var sectioninput = $("input[name=sectioninput]")
    var classsessioninput = $("input[name=classsessioninput]")
    var classsectioninput = $("input[name=classsectioninput]")
    var classinput = $("input[name=classinput]")
    sessionsectioninput.attr('readonly', true);
    sectioninput.attr('readonly', true);
    input.attr('readonly', true);
    classsessioninput.attr('readonly', true);
    classsectioninput.attr('readonly', true);
    classinput.attr('readonly', true);

    var csrftoken = $("#createsessionform > input[name=csrfmiddlewaretoken]").val();
    var csrftoken2 = $("#createsectionform > input[name=csrfmiddlewaretoken]").val();
    var csrftoken3 = $("#createclassform > input[name=csrfmiddlewaretoken]").val();
    
    
    


    $("#createsession").click(function() {
        var serializedData = $("#createsessionform").serialize();
        
        $.ajax({
            url:'/session/create/',
            data: serializedData,
            type:'post',
            success: function(response) {
                $("#sessionlist").append('<div id="sessioncard" class="card mb-1" data-id="' + response.session.id + '"><div class="card-body"><input type="text" id="input_' + response.session.id + '" value="' + response.session.session_name + '" class="form-control col-4 input_" style="margin-left: 15px!important; display: inline;" name="input" data-id="' + response.session.id + '"><button type="button" name="submit" class="close float-right delete_ mt-2" id="deletebtn_' + response.session.id + '" data-id="' + response.session.id + '"><span aria-hidden="true">&times;</span></button></div></div>')
                $("#sessionslistdropdown").append('<option value="' + response.session.session_name + '" id="' + response.session.id + '">' + response.session.session_name + '</option>')
                $("#class_sessionslistdropdown").append('<option value="' + response.session.session_name + '" id="' + response.session.id + '">' + response.session.session_name + '</option>')
                $("#subjectssessionlistdropdown").append('<option value="' + response.session.session_name + '" id="' + response.session.id + '">' + response.session.session_name + '</option>')
                $("#studentsessionslistdropdown").append('<option value="' + response.session.session_name + '" id="' + response.session.id + '">' + response.session.session_name + '</option>')
                $("#resultsessionslistdropdown").append('<option value="' + response.session.session_name + '" id="' + response.session.id + '">' + response.session.session_name + '</option>')
                $("#nurresultsessionslistdropdown").append('<option value="' + response.session.session_name + '" id="' + response.session.id + '">' + response.session.session_name + '</option>')

                $("#primresultsessionslistdropdown").append('<option value="' + response.session.session_name + '" id="' + response.session.id + '">' + response.session.session_name + '</option>')
                $("#commentsessionslistdropdown").append('<option value="' + response.session.session_name + '" id="' + response.session.id + '">' + response.session.session_name + '</option>')
                $("#resultsheetsessionslistdropdown").append('<option value="' + response.session.session_name + '" id="' + response.session.id + '">' + response.session.session_name + '</option>')
                $("#nurresultsheetsessionslistdropdown").append('<option value="' + response.session.session_name + '" id="' + response.session.id + '">' + response.session.session_name + '</option>')
                $("#detailssessionslistdropdown").append('<option value="' + response.session.session_name + '" id="' + response.session.id + '">' + response.session.session_name + '</option>')
                
                $("#createsessionform")[0].reset();
                $("#input_" + response.session.id).attr('readonly', true);

            },
            error: function(error){
                alert('session not created')
            }
        })  
        
        

    });

   
    
    $("#sessionlist").on('click', '.delete_', function() {
        var deletebtnid = $(this).data('id');
        var value = $('#input_' + deletebtnid + '').val();
        console.log(value);

        $.ajax({
            url:`sessioncard/delete/${value}/`,
            type:'get',
            success: function(response) {
                console.log(response.value)
                const sectionsessionsdropdown = response.value
                sectionsessionsdropdown.map(item=>{
                console.log(item.id)
                $('#sectioncard[data-id=' + item.id + ']').remove();
                })
            },
        });

        $.ajax({
            url:`sessioncard2/delete/${value}/`,
            type:'get',
            success: function(response) {
                console.log(response.value1)
                const sectionsessionsdropdown = response.value1
                sectionsessionsdropdown.map(item=>{
                console.log(item.id)
                $('#classcard[data-id=' + item.id + ']').remove();
                })
            },
        });
        
        
        $.ajax({
            url:'session/' + deletebtnid + '/delete/',
            data: {
                csrfmiddlewaretoken: csrftoken,
                id: deletebtnid,
            },
            type:'post',
            success: function() {
                var sessionitem = $('#sessioncard[data-id="' + deletebtnid + '"]');
                var sessiondropdownitem = $('#sessionslistdropdown > #' + deletebtnid + '');
                var classsessiondropdownitem = $('#class_sessionslistdropdown > #' + deletebtnid + '');
                var subjectsessiondropdownitem = $('#subjectssessionlistdropdown > #' + deletebtnid + '')
                sessionitem.remove();
                sessiondropdownitem.remove();
                classsessiondropdownitem.remove();
                subjectsessiondropdownitem.remove();
            }
        });

        
    });

    $.ajax({
            type:'GET',
            url: 'section/session/',
            success: function(response){
                const sessiondropdown = document.getElementById('sessionslistdropdown')
                const sessionsdropdown = response.sessions_val
                sessionsdropdown.map(item=>{
                    const option = document.createElement('option')
                    option.textContent = item.session_name
                    option.setAttribute('value', item.session_name)
                    option.setAttribute('id', item.id)
                    sessiondropdown.appendChild(option)

                })
            },
            error: function(error){
                console.log(error)
            }
    });



    $.ajax({
        type:'GET',
        url: 'class/session/',
        success: function(response){
            const sessiondropdown = document.getElementById('class_sessionslistdropdown')
            const subjectsessiondropdown = document.getElementById('subjectssessionlistdropdown')
            const studentsessiondropdown = document.getElementById('studentsessionslistdropdown')
            const resultsessiondropdown = document.getElementById('resultsessionslistdropdown')
            const nurresultsessiondropdown = document.getElementById('nurresultsessionslistdropdown')

            const sessionsdropdown = response.class_sessions_val
            sessionsdropdown.map(item=>{
                const option = document.createElement('option')
                const option2 = document.createElement('option')
                const option3 = document.createElement('option')
                const option4 = document.createElement('option')
                const option5 = document.createElement('option')
                option.textContent = item.session_name
                option.setAttribute('value', item.session_name)
                option.setAttribute('id', item.id)

                option2.textContent = item.session_name
                option2.setAttribute('value', item.session_name)
                option2.setAttribute('id', item.id)
               

                option3.textContent = item.session_name
                option3.setAttribute('value', item.session_name)
                option3.setAttribute('id', item.id)

                option4.textContent = item.session_name
                option4.setAttribute('value', item.session_name)
                option4.setAttribute('id', item.id)

                option5.textContent = item.session_name
                option5.setAttribute('value', item.session_name)
                option5.setAttribute('id', item.id)

                sessiondropdown.appendChild(option);
                subjectsessiondropdown.appendChild(option2);
                studentsessiondropdown.appendChild(option3);
                resultsessiondropdown.appendChild(option4);
                nurresultsessiondropdown.appendChild(option5);

            })
        },
        error: function(error){
            console.log(error)
        }
    });


    const class_sectioninput = document.getElementById('class_sessionslistdropdown');
    const sectiondropdown = document.getElementById('sectionslistdropdown');

    class_sectioninput.addEventListener('change', e=>{
        console.log(e.target.value)
        const selected_class_sectioninput = e.target.value
        
        sectiondropdown.innerHTML = ""

        $.ajax({
            type:'GET',
            url: `class/section/${selected_class_sectioninput}/`,
            success: function(response){
                console.log(response.data)
                const data = response.data
                const option2 = document.createElement('option')
                option2.textContent = "Choose a Section"
                option2.setAttribute('hidden', true)
                option2.setAttribute('selected', true)
                option2.setAttribute('disabled', true)
                sectiondropdown.appendChild(option2)
                data.map(item=>{
                    const option = document.createElement('option')
                    const option2 = document.createElement('option')
                    option.textContent = item.section_name
                    option2.textContent = "Choose a Section"
                    option.setAttribute('value', item.section_name)
                    option.setAttribute('id', item.id)
                    option2.setAttribute('hidden', true)
                    option2.setAttribute('selected', true)
                    option2.setAttribute('disabled', true)
                    sectiondropdown.appendChild(option)
                    sectiondropdown.appendChild(option2)
                })
                
            },
            error: function(error){
                console.log(error)
            }
         });
         
         
         
         
    })

    $("#createclass").click(function(){
        var session_name = $('#class_sessionslistdropdown').val();
        var section_name = $('#sectionslistdropdown').val();
        var class_name = $('#classinput').val();

        $.ajax({
            type:'POST',
            url: 'class/create/',
            data: {
                session_name: session_name,
                section_name: section_name,
                class_name: class_name,
                csrfmiddlewaretoken: csrftoken3,
            },
            success: function(response) {
                $("#classlist").append('<div id="classcard" class="card" data-id="' + response.class.id + '" name="' + response.class.session_name + '"><div class="card-body"><input type="text" id="classsessioninput_' + response.class.id + '" value="' + response.class.session_name + '" class="form-control col-2 classsessioninput_" style="margin-left: 15px!important; display: inline;" name="classsessioninput" data-id="' + response.class.id + '"><input type="text" id="classsectioninput_' + response.class.id + '" value="' + response.class.section_name + '" class="form-control col-3 classsectioninput_" style="margin-left: 30px!important; display: inline;" name="classsectioninput" data-id="' + response.class.id + '"><input type="text" id="classinput_' + response.class.id + '" value="' + response.class.class_name + '" class="form-control col-3 classinput_" style="margin-left: 30px!important; display: inline;" name="classinput" data-id="' + response.class.id + '"><button type="button" name="submit" class="classdelete_ close float-right mt-2" id="classdeletebtn_' + response.class.id + '" value="DELETE" data-id="' + response.class.id + '"><span aria-hidden="true">&times;</span></button></div></div>')
                $("#createclassform")[0].reset();
                $("#classsessioninput_" + response.class.id).attr('readonly', true);
                $("#classsectioninput_" + response.class.id).attr('readonly', true);
                $("#classinput_" + response.class.id).attr('readonly', true);
            },
            error: function(error){
                alert('class not created')
            }
        });
    });

    $("#classlist").on('click', '.classdelete_', function() {
        var classdeletebtnid = $(this).data('id');
        
        
        $.ajax({
            url:'class/' + classdeletebtnid + '/delete/',
            data: {
                csrfmiddlewaretoken: csrftoken3,
                id: classdeletebtnid,
            },
            type:'post',
            success: function() {
                var classitem = $('#classcard[data-id="' + classdeletebtnid + '"]');
                classitem.remove();
            }
        });
    });

    
    $("#createsection").click(function(){
        var session_name = $('#sessionslistdropdown').val();
        var section_name = $('#sectioninput').val();
        

        $.ajax({
            type:'POST',
            url: 'section/create/',
            data: {
                session_name: session_name,
                section_name: section_name,
                csrfmiddlewaretoken: csrftoken2,
            },
            success: function(response) {
                $("#sectionlist").append('<div id="sectioncard" class="card mb-1" data-id="' + response.section.id + '" name="' + response.section.session_name + '"><div class="card-body" ><input type="text" id="sectionsessioninput_' + response.section.id + '" value="' + response.section.session_name + '" class="form-control col-2 sectionsessioninput_" style="margin-left: 15px!important; display: inline;" name="sessionsectioninput" data-id="' + response.section.id + '"><input type="text" id="sectioninput_' + response.section.id + '" value="' + response.section.section_name + '" class="form-control col-3 sectioninput_" style="margin-left: 30px!important; display: inline;" name="sectioninput" data-id="' + response.section.id + '"><button type="button" name="submit" class="close float-right sectiondelete_ mt-2" id="sectiondeletebtn_' + response.section.id + '" value="DELETE" data-id="' + response.section.id + '"><span aria-hidden="true">&times;</span></button></div></div>')
                $("#createsectionform")[0].reset();
                $("#sectioninput_" + response.section.id).attr('readonly', true);
                $("#sectionsessioninput_" + response.section.id).attr('readonly', true);

            },
            error: function(error){
                alert('section not created')
            }
        });
    });

    

    $("#sectionlist").on('click', '.sectiondelete_', function() {
        var sectiondeletebtnid = $(this).data('id');
        var value = $('#sectioninput_' + sectiondeletebtnid + '').val();
        
        $.ajax({
            url:`sectioncard/delete/${value}/`,
            type:'get',
            success: function(response) {
                console.log(response.value)
                const sectionsessionsdropdown = response.value123
                sectionsessionsdropdown.map(item=>{
                console.log(item.id)
                $('#classcard[data-id=' + item.id + ']').remove();
                })
            },
        });
        
        $.ajax({
            url:'section/' + sectiondeletebtnid + '/delete/',
            data: {
                csrfmiddlewaretoken: csrftoken2,
                id: sectiondeletebtnid,
            },
            type:'post',
            success: function() {
                var sectionitem = $('#sectioncard[data-id="' + sectiondeletebtnid + '"]');
                sectionitem.remove();
            }
        });
    });





    const selectsectionsubjects = document.getElementById('selectsectionsubjects');
    const subjectslist = document.getElementById('subjectslist');

    selectsectionsubjects.addEventListener('change', e=>{
        console.log(e.target.value)
        const selected_selectsectionsubjects = e.target.value
        
        subjectslist.innerHTML = ""

        $.ajax({
            type:'GET',
            url: `section/subjects/${selected_selectsectionsubjects}/`,
            success: function(response){
                console.log(response.subjects_list)
                const data = response.subjects_list
                data.map(item=>{
                    const checkbox = document.createElement('input')
                    const br = document.createElement('br')
                    const label = document.createElement('label')
                    label.textContent = item.subject_name
                    checkbox.setAttribute('type', 'checkbox')
                    checkbox.setAttribute('id', 'subjectlistitem_' + item.subject_name)
                    checkbox.style.marginRight = '7px';
                    checkbox.setAttribute('value', item.subject_name)
                    checkbox.setAttribute('name', 'subjectcheckbox')
                    label.setAttribute('for', 'subjectlistitem_' + item.subject_name)
                    subjectslist.appendChild(checkbox)
                    subjectslist.appendChild(label)
                    subjectslist.appendChild(br)
                    
                })
                
            },
            error: function(error){
                console.log(error)
            }
         });
         
         
         
         
    })

    
    const subjectsessioninput1 = document.getElementById('subjectssessionlistdropdown');
    const subjectsectiondropdown = document.getElementById('subjectsectionslistdropdown');

    subjectsessioninput1.addEventListener('change', e=>{
        console.log(e.target.value)
        const selected_subjectsessioninput1 = e.target.value
        
        subjectsectiondropdown.innerHTML = ""

        $.ajax({
            type:'GET',
            url: `subject/section/${selected_subjectsessioninput1}/`,
            success: function(response){
                console.log(response.data2)
                const option2 = document.createElement('option')
                option2.textContent = "Choose a Section"
                option2.setAttribute('hidden', true)
                option2.setAttribute('selected', true)
                option2.setAttribute('disabled', true)
                subjectsectiondropdown.appendChild(option2)
                const data = response.data2
                data.map(item=>{
                    const option = document.createElement('option')
                    const option2 = document.createElement('option')
                    option.textContent = item.section_name
                    option2.textContent = "Choose a Section"
                    option.setAttribute('value', item.section_name)
                    option.setAttribute('id', item.id)
                    option2.setAttribute('hidden', true)
                    option2.setAttribute('selected', true)
                    option2.setAttribute('disabled', true)
                    subjectsectiondropdown.appendChild(option)
                    subjectsectiondropdown.appendChild(option2)
                })
                
            },
            error: function(error){
                console.log(error)
            }
         });
    })


    const subjectsectioninput1 = document.getElementById('subjectsectionslistdropdown');
    const subjectclassdropdown = document.getElementById('subjectclasslistdropdown');

    subjectsectioninput1.addEventListener('change', e=>{
        console.log(e.target.value)
        const selected_subjectsectioninput1 = e.target.value
        const val = $('#subjectssessionlistdropdown').val();
        console.log(val)
        
        subjectclassdropdown.innerHTML = ""

        $.ajax({
            type:'GET',
            url: `subject/class/${selected_subjectsectioninput1}/${val}/`,
            success: function(response){
                console.log(response.data3)
                const option2 = document.createElement('option')
                option2.textContent = "Choose a Class"
                option2.setAttribute('hidden', true)
                option2.setAttribute('selected', true)
                option2.setAttribute('disabled', true)
                subjectclassdropdown.appendChild(option2)
                const data = response.data3
                data.map(item=>{
                    const option = document.createElement('option')
                    const option2 = document.createElement('option')
                    option.textContent = item.class_name
                    option2.textContent = "Choose a Class"
                    option.setAttribute('value', item.class_name)
                    option.setAttribute('id', item.id)
                    option2.setAttribute('hidden', true)
                    option2.setAttribute('selected', true)
                    option2.setAttribute('disabled', true)
                    subjectclassdropdown.appendChild(option)
                    subjectclassdropdown.appendChild(option2)
                })
                
            },
            error: function(error){
                console.log(error)
            }
         });
    })
    

    const subjectclassinput1 = document.getElementById('subjectclasslistdropdown');
    const subjecttermdropdown = document.getElementById('subjecttermlistdropdown');

    subjectclassinput1.addEventListener('change', e=>{
        console.log(e.target.value)
        
        subjecttermdropdown.innerHTML = ""

        const option2 = document.createElement('option')
        option2.textContent = "Choose a Term"
        option2.setAttribute('hidden', true)
        option2.setAttribute('selected', true)
        option2.setAttribute('disabled', true)
        subjecttermdropdown.appendChild(option2)

        const option = document.createElement('option')
        option.textContent = 'FIRST TERM'
        option.setAttribute('value', 'FIRST TERM')
        option.setAttribute('id', '')
        subjecttermdropdown.appendChild(option)

        const option3 = document.createElement('option')
        option3.textContent = 'SECOND TERM'
        option3.setAttribute('value', 'SECOND TERM')
        option3.setAttribute('id', '')
        subjecttermdropdown.appendChild(option3)

        const option4 = document.createElement('option')
        option4.textContent = 'THIRD TERM'
        option4.setAttribute('value', 'THIRD TERM')
        option4.setAttribute('id', '')
        subjecttermdropdown.appendChild(option4)

       
    })


    const subjecttermlistdropdown = document.getElementById('subjecttermlistdropdown');
    const termsubjectlist = document.getElementById('termsubjectlist');

    subjecttermlistdropdown.addEventListener('change', e=>{
        console.log(e.target.value)
        const selected_subjectsectioninput1 = e.target.value
        const val = $('#subjectssessionlistdropdown').val();
        const val2 = $('#subjectsectionslistdropdown').val();
        const val3 = $('#subjectclasslistdropdown').val();
        console.log(val)
        console.log(val2)
        console.log(val3)
        
        
        termsubjectlist.innerHTML = ""

        $.ajax({
            type:'GET',
            url: `subject/list/${selected_subjectsectioninput1}/${val}/${val2}/${val3}/`,
            success: function(response){
                console.log(response.data4)
                const data = response.data4
                data.map(item=>{
                    const checkbox = document.createElement('input')
                    const label = document.createElement('label')
                    const br = document.createElement('br')
                    label.textContent = item.subject_name
                    checkbox.setAttribute('value', item.subject_name)
                    checkbox.setAttribute('id', 'termsubjectitemid_' + item.id)
                    checkbox.setAttribute('data-id', item.id)
                    checkbox.setAttribute('type', 'checkbox')
                    checkbox.setAttribute('name', 'termsubjectcheckbox')
                    checkbox.setAttribute('class', 'termsubjectcheckbox')
                    checkbox.style.marginRight = '7px';
                    label.setAttribute('for', 'termsubjectitemid_' + item.id)
                    label.setAttribute('id', 'termsubjectitemlabel_' + item.id)
                    br.setAttribute('id', 'brtag_' + item.id)
                    termsubjectlist.appendChild(checkbox)
                    termsubjectlist.appendChild(label)
                    termsubjectlist.appendChild(br)
                })
                
            },
            error: function(error){
                console.log(error)
            }
         });
    })




let subjectcreatebtn = document.getElementById('subjectcreatebtn')
let subjectlist = document.querySelectorAll(".tabs .tab-content .subjectallocation .subjectdisplay .subjectdisplay2 > div");

// for(let i=0;i<subjectlist.length;i++){
    subjectcreatebtn.addEventListener("click", function(){
        var favourite = [];
        $.each($("input[name='subjectcheckbox']:checked"), function() {
            favourite.push($(this).val());
        });
        // alert("subjects are" + favourite);
        console.log(favourite[0]);
        for(let i=0;i<favourite.length;i++){
            //console.log(favourite[i])
            var session_name = $('#subjectssessionlistdropdown').val();
            var section_name = $('#subjectsectionslistdropdown').val();
            var class_name = $('#subjectclasslistdropdown').val();
            var term_name = $('#subjecttermlistdropdown').val();
            var csrftoken4 = $(".subjectdisplay > input[name=csrfmiddlewaretoken]").val();
            console.log(session_name, section_name, class_name, term_name, csrftoken4)

            $.ajax({
                type:'POST',
                url: `term_subject/create/${favourite[i]}/`,
                data: {
                    session_name: session_name,
                    section_name: section_name,
                    class_name: class_name,
                    term_name: term_name,
                    csrfmiddlewaretoken: csrftoken4,
                },
                success: function(response){
                    console.log(response.subject)
                    $("#termsubjectlist").append('<input type="checkbox" value="' + response.subject.subject_name + '" id="termsubjectitemid_' + response.subject.id + '" data-id="' + response.subject.id + '" name="termsubjectcheckbox" style="margin-right:7px;"><label for="termsubjectitemid_' + response.subject.id + '" id="termsubjectitemlabel_' + response.subject.id + '">' + response.subject.subject_name + '</label><br id="brtag_' + response.subject.id + '">')
                    //document.getElementById('subjectlistitem_' + favourite[i] + '').checked = false;
                    
                },   
                error: function(error){
                    alert('subject not created')
                }
            });    
        }       
    });
// }


let promotioncreatebtn = document.getElementById('promotebtn')
let studentlist = document.querySelectorAll(".tabs .tab-content .promotionpage .promotiondisplay .promotiondisplay2 .normaldisplay");




let subjectdeletebtn = document.getElementById('subjectdeletebtn')
let termsubjectlist2 = document.querySelectorAll(".tabs .tab-content .subjectallocation .subjectdisplay .subjectdisplay3 .termsubjectdisplay");

for(let i=0;i<termsubjectlist2.length;i++){
    subjectdeletebtn.addEventListener("click", function(){
        var favourite2 = [];
        var bobo = [];
        $.each($("input[name='termsubjectcheckbox']:checked"), function() {
            favourite2.push($(this).data('id'));
            bobo.push($(this).val());
        });
        console.log(favourite2[0]);
        for(let i=0;i<favourite2.length;i++){
            var csrftoken4 = $(".subjectdisplay > input[name=csrfmiddlewaretoken]").val();
            var one = $('#subjectssessionlistdropdown').val();
            var two = $('#subjectsectionslistdropdown').val();
            var three = $('#subjectclasslistdropdown').val();
            var four = $('#subjecttermlistdropdown').val();
            console.log(csrftoken4, one, two, three, four, bobo[i])

            $.ajax({
                type:'POST',
                url:'term_subject/reset/',
                data: {
                    csrfmiddlewaretoken: csrftoken4,
                    session_name:one,
                    section_name:two,
                    class_name:three,
                    term_name:four,
                    subject_name:bobo[i],
                    
                },
                success: function(response){
                    $.ajax({
                        type:'POST',
                        url: `term_subject/delete/${favourite2[i]}/`,
                        data: {
                            csrfmiddlewaretoken: csrftoken4,
                        },
                        success: function(response){
                            console.log(response.subject)
                            $('#termsubjectitemid_' + favourite2[i]).remove();
                            $('#termsubjectitemlabel_' + favourite2[i]).remove();
                            $('#brtag_' + favourite2[i]).remove();

                            
                            
                        },   
                        error: function(error){
                            alert('subject not deleted')
                        }
                    });

                    
                    
                },
                error: function(error){
                    alert('subject not deleted')
                }

            });
               

            
        }
    });   
}

    
    // $("#createstudent2").click(function(){
    //     console.log('it is done')
    //     var student_session_name = $('#studentsessionslistdropdown').val();
    //     var student_section_name = $('#studentsectionlistdropdown').val();
    //     var student_class_name = $('#studentclasslistdropdown').val();
    //     var student_term_name = $('#studenttermlistdropdown').val();
    //     var student_first_name = $('#studentfirstnameinput').val();
    //     var student_middle_name = $('#studentmiddlenameinput').val();
    //     var student_last_name = $('#studentlastnameinput').val();
    //     var student_username = $('#studentusernameinput').val();
    //     var student_gender = $('#studentgenderlistdropdown').val();
    //     var student_date_of_birth = $('#studentdateofbirthinput').val();
    //     var student_password_1 = $('#studentpassword1').val();
    //     var student_password_2 = $('#studentpassword2').val();
    //     var csrftoken5 = $(".bodo > input[name=csrfmiddlewaretoken]").val();
        
    //     formData.append('student_session_name', student_session_name);
    //     formData.append('student_section_name', student_section_name);
    //     formData.append('student_class_name', student_class_name);
    //     formData.append('student_term_name', student_term_name);
    //     formData.append('student_first_name', student_first_name);
    //     formData.append('student_middle_name', student_middle_name);
    //     formData.append('student_last_name', student_last_name);
    //     formData.append('student_username', student_username);
    //     formData.append('student_gender', student_gender);
    //     formData.append('student_date_of_birth', student_date_of_birth);
    //     formData.append('student_password_1', student_password_1);
    //     formData.append('student_password_2', student_password_2);
    //     formData.append('image', $('#studentpassport')[0].files[0]);
    //     formData.append('csrfmiddlewaretoken', csrftoken5);
    //     formData.append('action', 'create-student');
        
        
        
    //     console.log(csrftoken5)

    //     console.log(student_session_name, student_section_name, student_class_name, student_term_name, student_first_name, student_middle_name, student_last_name, student_username, student_gender, student_date_of_birth, student_password_1, student_password_2, formData)
        

    //     $.ajax({
    //         type: "POST",
    //         url: "student/create/",
    //         data: formData,
    //         cache: false,
    //         processData: false,
    //         contentType: false,
    //         enctype: 'multipart/form-data',
    //         success: function(response) {
    //             alert('student created')
    //             $('#createstudentform').reset();
    //             // student_section_name.reset();
    //             // student_class_name.reset();
    //             // student_term_name.reset();
    //             // student_first_name.reset();
    //             // student_middle_name.reset();
    //             // student_last_name.reset();
    //             // student_username.reset();
    //             // student_gender.reset();
    //             // student_date_of_birth.reset();
    //             // student_password_1.reset();
    //             // student_password_2.reset();
    //         }
    //     })
    // });




    const studentsessioninput1 = document.getElementById('studentsessionslistdropdown');
    const studentsectiondropdown = document.getElementById('studentsectionlistdropdown');

    studentsessioninput1.addEventListener('change', e=>{
        console.log(e.target.value)
        const selected_studentsessioninput1 = e.target.value
        
        studentsectiondropdown.innerHTML = ""

        $.ajax({
            type:'GET',
            url: `subject/section/${selected_studentsessioninput1}/`,
            success: function(response){
                console.log(response.data2)
                const option2 = document.createElement('option')
                option2.textContent = "Choose a Section"
                option2.setAttribute('hidden', true)
                option2.setAttribute('selected', true)
                option2.setAttribute('disabled', true)
                studentsectiondropdown.appendChild(option2)
                const data = response.data2
                data.map(item=>{
                    const option = document.createElement('option')
                    const option2 = document.createElement('option')
                    option.textContent = item.section_name
                    option2.textContent = "Choose a Section"
                    option.setAttribute('value', item.section_name)
                    option.setAttribute('id', item.id)
                    option2.setAttribute('hidden', true)
                    option2.setAttribute('selected', true)
                    option2.setAttribute('disabled', true)
                    studentsectiondropdown.appendChild(option)
                    studentsectiondropdown.appendChild(option2)
                })
                
            },
            error: function(error){
                console.log(error)
            }
         });
    })



    const studentsectioninput1 = document.getElementById('studentsectionlistdropdown');
    const studentclassdropdown = document.getElementById('studentclasslistdropdown');

    studentsectioninput1.addEventListener('change', e=>{
        console.log(e.target.value)
        const selected_studentsectioninput1 = e.target.value
        const val = $('#studentsessionslistdropdown').val();
        console.log(val)
        
        studentclassdropdown.innerHTML = ""

        $.ajax({
            type:'GET',
            url: `subject/class/${selected_studentsectioninput1}/${val}/`,
            success: function(response){
                console.log(response.data3)
                const option2 = document.createElement('option')
                option2.textContent = "Choose a Class"
                option2.setAttribute('hidden', true)
                option2.setAttribute('selected', true)
                option2.setAttribute('disabled', true)
                studentclassdropdown.appendChild(option2)
                const data = response.data3
                data.map(item=>{
                    const option = document.createElement('option')
                    const option2 = document.createElement('option')
                    option.textContent = item.class_name
                    option2.textContent = "Choose a Class"
                    option.setAttribute('value', item.class_name)
                    option.setAttribute('id', item.id)
                    option2.setAttribute('hidden', true)
                    option2.setAttribute('selected', true)
                    option2.setAttribute('disabled', true)
                    studentclassdropdown.appendChild(option)
                    studentclassdropdown.appendChild(option2)
                })
                
            },
            error: function(error){
                console.log(error)
            }
         });
    })



    const studentclassinput1 = document.getElementById('studentclasslistdropdown');
    const studenttermdropdown = document.getElementById('studenttermlistdropdown');

    studentclassinput1.addEventListener('change', e=>{
        console.log(e.target.value)
        
        studenttermdropdown.innerHTML = ""

        const option2 = document.createElement('option')
        option2.textContent = "Choose a Term"
        option2.setAttribute('hidden', true)
        option2.setAttribute('selected', true)
        option2.setAttribute('disabled', true)
        studenttermdropdown.appendChild(option2)

        const option = document.createElement('option')
        option.textContent = 'FIRST TERM'
        option.setAttribute('value', 'FIRST TERM')
        option.setAttribute('id', '')
        studenttermdropdown.appendChild(option)

        const option3 = document.createElement('option')
        option3.textContent = 'SECOND TERM'
        option3.setAttribute('value', 'SECOND TERM')
        option3.setAttribute('id', '')
        studenttermdropdown.appendChild(option3)

        const option4 = document.createElement('option')
        option4.textContent = 'THIRD TERM'
        option4.setAttribute('value', 'THIRD TERM')
        option4.setAttribute('id', '')
        studenttermdropdown.appendChild(option4)

       
    })






    const resultsessioninput1 = document.getElementById('resultsessionslistdropdown');
    const resultsectiondropdown = document.getElementById('resultsectionlistdropdown');

    resultsessioninput1.addEventListener('change', e=>{
        console.log(e.target.value)
        const selected_resultsessioninput1 = e.target.value
        
        resultsectiondropdown.innerHTML = ""

        $.ajax({
            type:'GET',
            url: `subject/section/${selected_resultsessioninput1}/`,
            success: function(response){
                console.log(response.data2)
                const option2 = document.createElement('option')
                option2.textContent = "Choose a Section"
                option2.setAttribute('hidden', true)
                option2.setAttribute('selected', true)
                option2.setAttribute('disabled', true)
                studentsectiondropdown.appendChild(option2)
                const data = response.data2
                data.map(item=>{
                    const option = document.createElement('option')
                    const option2 = document.createElement('option')
                    option.textContent = item.section_name
                    option2.textContent = "Choose a Section"
                    option.setAttribute('value', item.section_name)
                    option.setAttribute('id', item.id)
                    option2.setAttribute('hidden', true)
                    option2.setAttribute('selected', true)
                    option2.setAttribute('disabled', true)
                    resultsectiondropdown.appendChild(option)
                    resultsectiondropdown.appendChild(option2)
                })
                
            },
            error: function(error){
                console.log(error)
            }
         });
    })


    const nurresultsessioninput1 = document.getElementById('nurresultsessionslistdropdown');
    const nurresultsectiondropdown = document.getElementById('nurresultsectionlistdropdown');

    nurresultsessioninput1.addEventListener('change', e=>{
        console.log(e.target.value)
        const selected_nurresultsessioninput1 = e.target.value
        
        nurresultsectiondropdown.innerHTML = ""

        $.ajax({
            type:'GET',
            url: `subject/section/${selected_nurresultsessioninput1}/`,
            success: function(response){
                console.log(response.data2)
                const option2 = document.createElement('option')
                option2.textContent = "Choose a Section"
                option2.setAttribute('hidden', true)
                option2.setAttribute('selected', true)
                option2.setAttribute('disabled', true)
                studentsectiondropdown.appendChild(option2)
                const data = response.data2
                data.map(item=>{
                    const option = document.createElement('option')
                    const option2 = document.createElement('option')
                    option.textContent = item.section_name
                    option2.textContent = "Choose a Section"
                    option.setAttribute('value', item.section_name)
                    option.setAttribute('id', item.id)
                    option2.setAttribute('hidden', true)
                    option2.setAttribute('selected', true)
                    option2.setAttribute('disabled', true)
                    nurresultsectiondropdown.appendChild(option)
                    nurresultsectiondropdown.appendChild(option2)
                })
                
            },
            error: function(error){
                console.log(error)
            }
         });
    })



    const resultsectioninput1 = document.getElementById('resultsectionlistdropdown');
    const resultclassdropdown = document.getElementById('resultclasslistdropdown');

    resultsectioninput1.addEventListener('change', e=>{
        console.log(e.target.value)
        const selected_resultsectioninput1 = e.target.value
        const val = $('#resultsessionslistdropdown').val();
        console.log(val)
        
        resultclassdropdown.innerHTML = ""

        $.ajax({
            type:'GET',
            url: `subject/class/${selected_resultsectioninput1}/${val}/`,
            success: function(response){
                console.log(response.data3)
                const option2 = document.createElement('option')
                option2.textContent = "Choose a Class"
                option2.setAttribute('hidden', true)
                option2.setAttribute('selected', true)
                option2.setAttribute('disabled', true)
                studentclassdropdown.appendChild(option2)
                const data = response.data3
                data.map(item=>{
                    const option = document.createElement('option')
                    const option2 = document.createElement('option')
                    option.textContent = item.class_name
                    option2.textContent = "Choose a Class"
                    option.setAttribute('value', item.class_name)
                    option.setAttribute('id', item.id)
                    option2.setAttribute('hidden', true)
                    option2.setAttribute('selected', true)
                    option2.setAttribute('disabled', true)
                    resultclassdropdown.appendChild(option)
                    resultclassdropdown.appendChild(option2)
                })
                
            },
            error: function(error){
                console.log(error)
            }
         });
    })


    const nurresultsectioninput1 = document.getElementById('nurresultsectionlistdropdown');
    const nurresultclassdropdown = document.getElementById('nurresultclasslistdropdown');

    nurresultsectioninput1.addEventListener('change', e=>{
        console.log(e.target.value)
        const selected_nurresultsectioninput1 = e.target.value
        const val = $('#nurresultsessionslistdropdown').val();
        console.log(val)
        
        nurresultclassdropdown.innerHTML = ""

        $.ajax({
            type:'GET',
            url: `subject/class/${selected_nurresultsectioninput1}/${val}/`,
            success: function(response){
                console.log(response.data3)
                const option2 = document.createElement('option')
                option2.textContent = "Choose a Class"
                option2.setAttribute('hidden', true)
                option2.setAttribute('selected', true)
                option2.setAttribute('disabled', true)
                studentclassdropdown.appendChild(option2)
                const data = response.data3
                data.map(item=>{
                    const option = document.createElement('option')
                    const option2 = document.createElement('option')
                    option.textContent = item.class_name
                    option2.textContent = "Choose a Class"
                    option.setAttribute('value', item.class_name)
                    option.setAttribute('id', item.id)
                    option2.setAttribute('hidden', true)
                    option2.setAttribute('selected', true)
                    option2.setAttribute('disabled', true)
                    nurresultclassdropdown.appendChild(option)
                    nurresultclassdropdown.appendChild(option2)
                })
                
            },
            error: function(error){
                console.log(error)
            }
         });
    })



    const resultclassinput1 = document.getElementById('resultclasslistdropdown');
    const resulttermdropdown = document.getElementById('resulttermlistdropdown');

    resultclassinput1.addEventListener('change', e=>{
        console.log(e.target.value)
        
        resulttermdropdown.innerHTML = ""

        const option2 = document.createElement('option')
        option2.textContent = "Choose a Term"
        option2.setAttribute('hidden', true)
        option2.setAttribute('selected', true)
        option2.setAttribute('disabled', true)
        resulttermdropdown.appendChild(option2)

        const option = document.createElement('option')
        option.textContent = 'FIRST TERM'
        option.setAttribute('value', 'FIRST TERM')
        option.setAttribute('id', '')
        resulttermdropdown.appendChild(option)

        const option3 = document.createElement('option')
        option3.textContent = 'SECOND TERM'
        option3.setAttribute('value', 'SECOND TERM')
        option3.setAttribute('id', '')
        resulttermdropdown.appendChild(option3)

        const option4 = document.createElement('option')
        option4.textContent = 'THIRD TERM'
        option4.setAttribute('value', 'THIRD TERM')
        option4.setAttribute('id', '')
        resulttermdropdown.appendChild(option4)

       
    })


    const nurresultclassinput1 = document.getElementById('nurresultclasslistdropdown');
    const nurresulttermdropdown = document.getElementById('nurresulttermlistdropdown');

    nurresultclassinput1.addEventListener('change', e=>{
        console.log(e.target.value)
        
        nurresulttermdropdown.innerHTML = ""

        const option2 = document.createElement('option')
        option2.textContent = "Choose a Term"
        option2.setAttribute('hidden', true)
        option2.setAttribute('selected', true)
        option2.setAttribute('disabled', true)
        nurresulttermdropdown.appendChild(option2)

        const option = document.createElement('option')
        option.textContent = 'FIRST TERM'
        option.setAttribute('value', 'FIRST TERM')
        option.setAttribute('id', '')
        nurresulttermdropdown.appendChild(option)

        const option3 = document.createElement('option')
        option3.textContent = 'SECOND TERM'
        option3.setAttribute('value', 'SECOND TERM')
        option3.setAttribute('id', '')
        nurresulttermdropdown.appendChild(option3)

        const option4 = document.createElement('option')
        option4.textContent = 'THIRD TERM'
        option4.setAttribute('value', 'THIRD TERM')
        option4.setAttribute('id', '')
        nurresulttermdropdown.appendChild(option4)

       
    })



    const resulterminput1 = document.getElementById('resulttermlistdropdown');
    const resultsubjectdropdown = document.getElementById('resultsubjectlistdropdown');

    resulterminput1.addEventListener('change', e=>{
        console.log(e.target.value)
        const selected_resultterminput1 = e.target.value
        const val = $('#resultsessionslistdropdown').val();
        const val2 = $('#resultsectionlistdropdown').val();
        const val3 = $('#resultclasslistdropdown').val();
        console.log(val)
        
        resultsubjectdropdown.innerHTML = ""

        $.ajax({
            type:'GET',
            url: `subject/class/${selected_resultterminput1}/${val}/${val2}/${val3}/`,
            success: function(response){
                console.log(response.datax)
                const option2 = document.createElement('option')
                option2.textContent = "Choose a Subject"
                option2.setAttribute('hidden', true)
                option2.setAttribute('selected', true)
                option2.setAttribute('disabled', true)
                resultsubjectdropdown.appendChild(option2)
                const data = response.datax
                data.map(item=>{
                    const option = document.createElement('option')
                    const option2 = document.createElement('option')
                    option.textContent = item.subject_name
                    option2.textContent = "Choose a Subject"
                    option.setAttribute('value', item.subject_name)
                    option.setAttribute('id', item.id)
                    option2.setAttribute('hidden', true)
                    option2.setAttribute('selected', true)
                    option2.setAttribute('disabled', true)
                    resultsubjectdropdown.appendChild(option)
                    resultsubjectdropdown.appendChild(option2)
                })
                
            },
            error: function(error){
                console.log(error)
            }
         });
    })


    const nurresulterminput1 = document.getElementById('nurresulttermlistdropdown');
    const nurresultsubjectdropdown = document.getElementById('nurresultsubjectlistdropdown');

    nurresulterminput1.addEventListener('change', e=>{
        console.log(e.target.value)
        const selected_nurresultterminput1 = e.target.value
        const val = $('#nurresultsessionslistdropdown').val();
        const val2 = $('#nurresultsectionlistdropdown').val();
        const val3 = $('#nurresultclasslistdropdown').val();
        console.log(val)
        
        nurresultsubjectdropdown.innerHTML = ""

        $.ajax({
            type:'GET',
            url: `subject/class/${selected_nurresultterminput1}/${val}/${val2}/${val3}/`,
            success: function(response){
                console.log(response.datax)
                const option2 = document.createElement('option')
                option2.textContent = "Choose a Subject"
                option2.setAttribute('hidden', true)
                option2.setAttribute('selected', true)
                option2.setAttribute('disabled', true)
                nurresultsubjectdropdown.appendChild(option2)
                const data = response.datax
                data.map(item=>{
                    const option = document.createElement('option')
                    const option2 = document.createElement('option')
                    option.textContent = item.subject_name
                    option2.textContent = "Choose a Subject"
                    option.setAttribute('value', item.subject_name)
                    option.setAttribute('id', item.id)
                    option2.setAttribute('hidden', true)
                    option2.setAttribute('selected', true)
                    option2.setAttribute('disabled', true)
                    nurresultsubjectdropdown.appendChild(option)
                    nurresultsubjectdropdown.appendChild(option2)
                })
                
            },
            error: function(error){
                console.log(error)
            }
         });
    })

    var resultupdatebtn = $("input[name=resultupdatebtn]")
    var resultsavebtn = $("input[name=resultsavebtn]")
    resultupdatebtn.hide();
    resultsavebtn.hide();
    const resulsubjectinput1 = document.getElementById('resultsubjectlistdropdown');
    

    resulsubjectinput1.addEventListener('change', e=>{
        resultsavebtn.hide();
        console.log(e.target.value)
        const selected_resulsubjectinput1 = e.target.value
        const val = $('#resultsessionslistdropdown').val();
        const val2 = $('#resultsectionlistdropdown').val();
        const val3 = $('#resultclasslistdropdown').val();
        const val4 = $('#resulttermlistdropdown').val();
        console.log(val)
        $('#resultlist2').remove();
        
        
        

        $.ajax({
            type:'GET',
            url: `result/list/${selected_resulsubjectinput1}/${val}/${val2}/${val3}/${val4}/`,
            success: function(response){
                $('#resultlist').append('<div id="resultlist2" class="resultlistlist2" ><div class="card"><div class="card-body"><form action="" class="row"><h5 class="col-4" style="margin-left: 20px!important;">STUDENT NAME</h5><h5 class="col-1" style="margin-left: 40px!important;">1ST CA</h5><h5 class="col-1" style="margin-left: 40px!important;">2ND CA</h5><h5 class="col-1" style="margin-left: 40px!important;">3RD CA</h1><h5 class="col-1" style="margin-left: 40px!important;">4TH CA</h5><h5 class="col-1" style="margin-left: 40px!important;">EXAM</h5></form></div></div><div class="newdiv" id="newdiv"></div></div>');
                var mydata = response.name
                var mydata2 = response.data1
                var mydata3 = response.data2
                var mydata4 = response.data3
                var mydata5 = response.data4
                var mydata6 = response.data5
                var mydata7 = response.identity
                for (x in mydata, mydata2, mydata3, mydata4, mydata5, mydata6, mydata7) {
                    console.log(mydata[x], mydata2[x], mydata3[x], mydata4[x], mydata5[x], mydata6[x], mydata7[x])
                    var fish = mydata[x];
                    var chicken = mydata2[x];
                    var fowl = mydata3[x];
                    var cow = mydata4[x];
                    var sheep = mydata5[x];
                    var goat = mydata6[x];
                    var snake = mydata7[x]
                for (y in fish); for (z in chicken); for (x in fowl); for (b in cow); for (c in sheep); for (d in goat); for (f in snake); {
                    console.log(fish[y], chicken[z], fowl[x], cow[b], sheep[c], goat[d], snake[f])
                    
                    $(".newdiv").append('<div class="card primresult" name="studentresultcard"><div class="card-body"><form action="" class="row" id="prim_result_form" name="student_name"><input type="text" value="' + fish[y] + '" class="form-control col-4 student_name" style="margin-left: 20px!important;" id="' + snake[f] + '" data-id="' + snake[f] + '" name="student_name"><input type="text" value="' + chicken[z] + '" class="form-control col-1 student_first_ca" style="margin-left: 40px!important;" id="student_first_ca" data-id="identity_' + snake[f] + '" name="student_first_ca"><input type="text" value="' + fowl[x] + '" class="form-control col-1 student_second_ca" style="margin-left: 40px!important;" id="student_second_ca" data-id="identity_' + snake[f] + '" name="student_second_ca"><input type="text" value="' + cow[b] + '" class="form-control col-1 student_third_ca" style="margin-left: 40px!important;" id="student_third_ca" data-id="identity_' + snake[f] + '" name="student_third_ca"><input type="text" value="' + sheep[c] + '" class="form-control col-1 student_fourth_ca" style="margin-left: 40px!important;" id="student_fourth_ca" data-id="identity_' + snake[f] + '" name="student_fourth_ca"><input type="text" value="' + goat[d] + '" class="form-control col-1 student_exam" style="margin-left: 40px!important;" id="student_exam" data-id="identity_' + snake[f] + '" name="student_exam"></form></div></div>'); 
                    
                }
                }
                
                var name = $("input[name=student_name]")
                var first_ca = $("input[name=student_first_ca]")
                var second_ca = $("input[name=student_second_ca]")
                var third_ca = $("input[name=student_third_ca]")
                var fourth_ca = $("input[name=student_fourth_ca]")
                var exam = $("input[name=student_exam]")
                name.attr('readonly', true);
                first_ca.attr('readonly', true);
                second_ca.attr('readonly', true);
                third_ca.attr('readonly', true); 
                fourth_ca.attr('readonly', true);
                exam.attr('readonly', true);
                
                resultupdatebtn.show();
                
                
                
            },
            error: function(error){
                console.log(error)
            }
         });
    })

    $("#resultupdatebtn").click(function() {
        console.log('wow')
        var first_ca = $("input[name=student_first_ca]")
        var second_ca = $("input[name=student_second_ca]")
        var third_ca = $("input[name=student_third_ca]")
        var fourth_ca = $("input[name=student_fourth_ca]")
        var exam = $("input[name=student_exam]")
        first_ca.attr('readonly', false);
        second_ca.attr('readonly', false);
        third_ca.attr('readonly', false); 
        fourth_ca.attr('readonly', false);
        exam.attr('readonly', false);
        resultupdatebtn.hide();
        resultsavebtn.show();
    });

    
    $("#resultsavebtn").click(function() {
        
        var all = document.querySelectorAll('.primresult')
        var one = $("#resultsessionslistdropdown").val();
        var two = $("#resultsectionlistdropdown").val();
        var three = $("#resultclasslistdropdown").val();
        var four = $("#resulttermlistdropdown").val();
        var five = $("#resultsubjectlistdropdown").val();
        console.log(one, two, three, four, five)
        for (let i=0; i<all.length; i++){
            
            var student_name = all[i].querySelector('input.student_name').value;
            var student_firstca = all[i].querySelector('input.student_first_ca').value;
            var student_secondca = all[i].querySelector('input.student_second_ca').value;
            var student_thirdca = all[i].querySelector('input.student_third_ca').value;
            var student_fourthca = all[i].querySelector('input.student_fourth_ca').value;
            var student_exam = all[i].querySelector('input.student_exam').value;
            var identity = all[i].querySelector('input.student_name').id;
            var subject_name = $('#resultsubjectlistdropdown').val();
            var term_name = $('#resulttermlistdropdown').val();
            console.log(student_name, student_firstca, student_secondca, student_thirdca, student_fourthca, student_exam, identity, subject_name, term_name)

            $.ajax({
                type: "POST",
                url: `primresult/update/${identity}/`,
                data: {
                    csrfmiddlewaretoken:csrftoken,
                    subject_name:subject_name,
                    term_name:term_name,
                    first_ca:student_firstca,
                    second_ca:student_secondca,
                    third_ca:student_thirdca,
                    fourth_ca:student_fourthca,
                    exam:student_exam,
                },
            
                success: function(response) {
                       
                    var identitys = response.id
                    console.log(identitys)
                    
                    
                        $.ajax({
                            type: "POST",
                            url: `primresult/average/${identitys}/`,
                            data: {
                                csrfmiddlewaretoken:csrftoken,
                                session_name:one,
                                section_name:two,
                                class_name:three,
                                subject_name:five,
                                term_name:four,
                            },
                
                            success: function(response) {
                                console.log(response.stuff1, response.stuff2, response.stuff3)
                                var name = $("input[name=student_name]")
                                var first_ca = $("input[name=student_first_ca]")
                                var second_ca = $("input[name=student_second_ca]")
                                var third_ca = $("input[name=student_third_ca]")
                                var fourth_ca = $("input[name=student_fourth_ca]")
                                var exam = $("input[name=student_exam]")
                                name.attr('readonly', true);
                                first_ca.attr('readonly', true);
                                second_ca.attr('readonly', true);
                                third_ca.attr('readonly', true); 
                                fourth_ca.attr('readonly', true);
                                exam.attr('readonly', true);
                                resultupdatebtn.show();
                                resultsavebtn.hide();
                            }
                        });
                    
                }
            });

            
        }
        
    });


    // var nurresulsubjectinput1 = document.querySelector('.tabs .tab-content .nursery_result > .nurresultsubjectlistdropdown');
    

    // nurresulsubjectinput1.addEventListener('change', e=>{
        
    //     console.log(e.target.value)
    //     const selected_nurresulsubjectinput1 = e.target.value
    //     const val = $('#nurresultsessionslistdropdown').val();
    //     const val2 = $('#nurresultsectionlistdropdown').val();
    //     const val3 = $('#nurresultclasslistdropdown').val();
    //     const val4 = $('#nurresulttermlistdropdown').val();
    //     console.log(val)
    //     $('#nurresultlist2').remove();
        

    //     $.ajax({
    //         type:'GET',
    //         url: `result/list_nur/${selected_nurresulsubjectinput1}/${val}/${val2}/${val3}/${val4}/`,
    //         success: function(response){
    //             $('#nurresultlist').append('<div id="nurresultlist2" class="nurresultlistlist2 col-12 studentresultcontent" ></div>');
    //             var mydata = response.stud_name
                
    //             var mydata2 = response.data1
    //             var mydata3 = response.data2
    //             var mydata4 = response.data3
    //             var mydata5 = response.data4
    //             var mydata6 = response.data5
    //             var mydata7 = response.data6
    //             var mydata8 = response.data7
    //             var mydata9 = response.data8
    //             var mydata10 = response.data9
    //             var mydata11 = response.data10
    //             var mydata12 = response.data11
    //             var mydata13 = response.data12
    //             var mydata14 = response.data13
    //             var mydata15 = response.data14
    //             var mydata16 = response.identity
    //             console.log(mydata16)
    //             var frontend1 = response.data15
    //             var frontend2 = response.data16
    //             var frontend3 = response.data17
    //             var frontend4 = response.data18
    //             var frontend5 = response.data19
    //             var frontend6 = response.data20
    //             var frontend7 = response.data21
    //             var frontend8 = response.data22
    //             var frontend9 = response.data23
    //             var frontend10 = response.data24
    //             var frontend11 = response.data25
    //             var frontend12 = response.data26                
    //             for (x in mydata, mydata2, mydata3, mydata4, mydata5, mydata6, mydata7, mydata8, mydata9, mydata10, mydata11, mydata12, mydata13, mydata14, mydata15, mydata16, frontend1, frontend2, frontend3, frontend4, frontend5, frontend6, frontend7, frontend8, frontend9, frontend10, frontend11, frontend12) {
    //                 console.log(mydata[x], mydata2[x], mydata3[x], mydata4[x], mydata5[x], mydata6[x], mydata7[x], mydata8[x], mydata9[x], mydata10[x], mydata11[x], mydata12[x], mydata13[x], mydata14[x], mydata15[x], mydata16[x], frontend1[x], frontend2[x], frontend3[x], frontend4[x], frontend5[x], frontend6[x], frontend7[x], frontend8[x], frontend9[x], frontend10[x], frontend11[x], frontend12[x])
    //                 var fish = mydata[x];
    //                 var chicken = mydata2[x];
    //                 var fowl = mydata3[x];
    //                 var cow = mydata4[x];
    //                 var sheep = mydata5[x];
    //                 var goat = mydata6[x];
    //                 var snake = mydata7[x];
    //                 var rabbit = mydata8[x];
    //                 var chic = mydata9[x];
    //                 var hen = mydata10[x];
    //                 var whale = mydata11[x];
    //                 var shark = mydata12[x];
    //                 var dolphin = mydata13[x];
    //                 var snail = mydata14[x];
    //                 var spider = mydata15[x];
    //                 var housefly = mydata16[x];
    //                 var front1 = frontend1[x];
    //                 var front2 = frontend2[x];
    //                 var front3 = frontend3[x];
    //                 var front4 = frontend4[x];
    //                 var front5 = frontend5[x];
    //                 var front6 = frontend6[x];
    //                 var front7 = frontend7[x];
    //                 var front8 = frontend8[x];
    //                 var front9 = frontend9[x];
    //                 var front10 = frontend10[x];
    //                 var front11 = frontend11[x];
    //                 var front12 = frontend12[x];                    

    //             for (y in fish); for (z in chicken); for (x in fowl); for (b in cow); for (c in sheep); for (d in goat); for (f in snake); for (g in rabbit); for (h in chic); for (i in hen); for (j in whale); for (k in shark); for (l in dolphin); for (m in snail); for (n in spider); for (o in housefly); for (p in front1); for (q in front2); for (r in front3); for (s in front4); for (t in front5); for (u in front6); for (v in front7); for (w in front8); for (bb in front9); for (aa in front10); for (cc in front11); for (dd in front12); {
    //                 console.log(fish[y], chicken[z], fowl[x], cow[b], sheep[c], goat[d], snake[f], rabbit[g], chic[h], hen[i], whale[j], shark[k], dolphin[l], snail[m], spider[n], housefly[o], front1[p], front2[q], front3[r], front4[s], front5[t], front6[u], front7[v], front8[w], front9[bb], front10[aa], front11[cc], front12[dd])
    //                 if (selected_nurresulsubjectinput1 == 'LITERACY') {
    //                     $(".nurresultlistlist2").append('<div class="card" id="unique_card_' + housefly[o] + '"><div class="card-body"><h5>' + fish[y] + '</h5><h6>' + housefly[o] + '</h6><br><h7>' + selected_nurresulsubjectinput1 + '</h7><br><br><table class="table"><tbody><td>QUESTIONS</td><td>GRADES</td></tbody><tbody><td>I listen quitely to stories</td><td><form action="POST" class="col-11"><input type="radio" id="literacy_question_1_a_' + housefly[o] + '" name="literacy_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="literacy_question_1_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="literacy_question_1_b_' + housefly[o] + '" name="literacy_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="literacy_question_1_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="literacy_question_1_c_' + housefly[o] + '" name="literacy_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="literacy_question_1_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="literacy_question_1_d_' + housefly[o] + '" name="literacy_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="literacy_question_1_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>My attention span is lengthening</td><td><form action="POST" class="col-11"><input type="radio" id="literacy_question_2_a_' + housefly[o] + '" name="literacy_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="literacy_question_2_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="literacy_question_2_b_' + housefly[o] + '" name="literacy_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="literacy_question_2_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="literacy_question_2_c_' + housefly[o] + '" name="literacy_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="literacy_question_2_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="literacy_question_2_d_' + housefly[o] + '" name="literacy_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="literacy_question_2_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I respond to a story by recalling specific details</td><td><form action="POST" class="col-11"><input type="radio" id="literacy_question_3_a_' + housefly[o] + '" name="literacy_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="literacy_question_3_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="literacy_question_3_b_' + housefly[o] + '" name="literacy_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="literacy_question_3_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="literacy_question_3_c_' + housefly[o] + '" name="literacy_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="literacy_question_3_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="literacy_question_3_d_' + housefly[o] + '" name="literacy_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="literacy_question_3_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I speak clearly and communicate in sentence</td><td><form action="POST" class="col-11"><input type="radio" id="literacy_question_4_a_' + housefly[o] + '" name="literacy_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="literacy_question_4_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="literacy_question_4_b_' + housefly[o] + '" name="literacy_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="literacy_question_4_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="literacy_question_4_c_' + housefly[o] + '" name="literacy_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="literacy_question_4_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="literacy_question_4_d_' + housefly[o] + '" name="literacy_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="literacy_question_4_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I speak clearly and communicate my wants and ideas</td><td><form action="POST" class="col-11"><input type="radio" id="literacy_question_5_a_' + housefly[o] + '" name="literacy_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="literacy_question_5_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="literacy_question_5_b_' + housefly[o] + '" name="literacy_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="literacy_question_5_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="literacy_question_5_c_' + housefly[o] + '" name="literacy_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="literacy_question_5_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="literacy_question_5_d_' + housefly[o] + '" name="literacy_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="literacy_question_5_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I can answer some questions</td><td><form action="POST" class="col-11"><input type="radio" id="literacy_question_6_a_' + housefly[o] + '" name="literacy_question_6_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="literacy_question_6_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="literacy_question_6_b_' + housefly[o] + '" name="literacy_question_6_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="literacy_question_6_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="literacy_question_6_c_' + housefly[o] + '" name="literacy_question_6_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="literacy_question_6_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="literacy_question_6_d_' + housefly[o] + '" name="literacy_question_6_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="literacy_question_6_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I talk about pictures</td><td><form action="POST" class="col-11"><input type="radio" id="literacy_question_7_a_' + housefly[o] + '" name="literacy_question_7_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="literacy_question_7_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="literacy_question_7_b_' + housefly[o] + '" name="literacy_question_7_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="literacy_question_7_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="literacy_question_7_c_' + housefly[o] + '" name="literacy_question_7_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="literacy_question_7_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="literacy_question_7_d_' + housefly[o] + '" name="literacy_question_7_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="literacy_question_7_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I am expanding my vocabulary</td><td><form action="POST" class="col-11"><input type="radio" id="literacy_question_8_a_' + housefly[o] + '" name="literacy_question_8_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="literacy_question_8_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="literacy_question_8_b_' + housefly[o] + '" name="literacy_question_8_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="literacy_question_8_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="literacy_question_8_c_' + housefly[o] + '" name="literacy_question_8_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="literacy_question_8_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="literacy_question_8_d_' + housefly[o] + '" name="literacy_question_8_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="literacy_question_8_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody></table><br><div class="row col-12 ml-1"><input type="button" name="PREVIOUS" id="nurresultpreviousbtn" class="btn btn-outline-success col-1" value="PREVIOUS"><div class="col-10"></div><input type="button" name="NEXT" id="nurresultsavebtn" class="btn btn-outline-success col-1" value="NEXT"></div></div></div>');
    //                     let nurresultContents = document.getElementById("unique_card_1");
    //                     nurresultContents.classList.add("active");
    //                     if (chicken[z] == 'A') {
    //                         document.getElementById('literacy_question_1_a_' + housefly[o]).checked = true;
    //                     } else if (chicken[z] == 'B') {
    //                         document.getElementById('literacy_question_1_b_' + housefly[o]).checked = true;
    //                     } else if (chicken[z] == 'C') {
    //                         document.getElementById('literacy_question_1_c_' + housefly[o]).checked = true;
    //                     } else if (chicken[z] == 'D') {
    //                         document.getElementById('literacy_question_1_d_' + housefly[o]).checked = true;
    //                     }


    //                     if (fowl[x] == 'A') {
    //                         document.getElementById('literacy_question_2_a_' + housefly[o]).checked = true;
    //                     } else if (fowl[x] == 'B') {
    //                         document.getElementById('literacy_question_2_b_' + housefly[o]).checked = true;
    //                     } else if (fowl[x] == 'C') {
    //                         document.getElementById('literacy_question_2_c_' + housefly[o]).checked = true;
    //                     } else if (fowl[x] == 'D') {
    //                         document.getElementById('literacy_question_2_d_' + housefly[o]).checked = true;
    //                     }

    //                     if (cow[b] == 'A') {
    //                         document.getElementById('literacy_question_3_a_' + housefly[o]).checked = true;
    //                     } else if (cow[b] == 'B') {
    //                         document.getElementById('literacy_question_3_b_' + housefly[o]).checked = true;
    //                     } else if (cow[b] == 'C') {
    //                         document.getElementById('literacy_question_3_c_' + housefly[o]).checked = true;
    //                     } else if (cow[b] == 'D') {
    //                         document.getElementById('literacy_question_3_d_' + housefly[o]).checked = true;
    //                     }

    //                     if (sheep[c] == 'A') {
    //                         document.getElementById('literacy_question_4_a_' + housefly[o]).checked = true;
    //                     } else if (sheep[c] == 'B') {
    //                         document.getElementById('literacy_question_4_b_' + housefly[o]).checked = true;
    //                     } else if (sheep[c] == 'C') {
    //                         document.getElementById('literacy_question_4_c_' + housefly[o]).checked = true;
    //                     } else if (sheep[c] == 'D') {
    //                         document.getElementById('literacy_question_4_d_' + housefly[o]).checked = true;
    //                     }

    //                     if (goat[d] == 'A') {
    //                         document.getElementById('literacy_question_5_a_' + housefly[o]).checked = true;
    //                     } else if (goat[d] == 'B') {
    //                         document.getElementById('literacy_question_5_b_' + housefly[o]).checked = true;
    //                     } else if (goat[d] == 'C') {
    //                         document.getElementById('literacy_question_5_c_' + housefly[o]).checked = true;
    //                     } else if (goat[d] == 'D') {
    //                         document.getElementById('literacy_question_5_d_' + housefly[o]).checked = true;
    //                     }

    //                     if (snake[f] == 'A') {
    //                         document.getElementById('literacy_question_6_a_' + housefly[o]).checked = true;
    //                     } else if (snake[f] == 'B') {
    //                         document.getElementById('literacy_question_6_b_' + housefly[o]).checked = true;
    //                     } else if (snake[f] == 'C') {
    //                         document.getElementById('literacy_question_6_c_' + housefly[o]).checked = true;
    //                     } else if (snake[f] == 'D') {
    //                         document.getElementById('literacy_question_6_d_' + housefly[o]).checked = true;
    //                     }

    //                     if (rabbit[g] == 'A') {
    //                         document.getElementById('literacy_question_7_a_' + housefly[o]).checked = true;
    //                     } else if (rabbit[g] == 'B') {
    //                         document.getElementById('literacy_question_7_b_' + housefly[o]).checked = true;
    //                     } else if (rabbit[g] == 'C') {
    //                         document.getElementById('literacy_question_7_c_' + housefly[o]).checked = true;
    //                     } else if (rabbit[g] == 'D') {
    //                         document.getElementById('literacy_question_7_d_' + housefly[o]).checked = true;
    //                     }

    //                     if (chic[h] == 'A') {
    //                         document.getElementById('literacy_question_8_a_' + housefly[o]).checked = true;
    //                     } else if (chic[h] == 'B') {
    //                         document.getElementById('literacy_question_8_b_' + housefly[o]).checked = true;
    //                     } else if (chic[h] == 'C') {
    //                         document.getElementById('literacy_question_8_c_' + housefly[o]).checked = true;
    //                     } else if (chic[h] == 'D') {
    //                         document.getElementById('literacy_question_8_d_' + housefly[o]).checked = true;
    //                     }
    //                 } else if (selected_nurresulsubjectinput1 == 'NUMERACY') {
    //                     $(".nurresultlistlist2").append('<div class="card" id="unique_card_' + housefly[o] + '"><div class="card-body"><h5>' + fish[y] + '</h5><h6>' + housefly[o] + '</h6><br><h7>' + selected_nurresulsubjectinput1 + '</h7><br><br><table class="table"><tbody><td>QUESTIONS</td><td>GRADES</td></tbody><tbody><td>I can count orally numbers <input type="text" class="form-control" id="numeracy_question_1_first_input_' + housefly[o] + '" style="width:35px!important;" value="' + front1[p] + '"> to <input type="text" class="form-control" id="numeracy_question_1_second_input_' + housefly[o] + '" style="width:60px!important;" value="' + front2[q] + '"></td><td><form action="POST" class="col-11"><input type="radio" id="numeracy_question_1_a_' + housefly[o] + '" name="numeracy_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="numeracy_question_1_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="numeracy_question_1_b_' + housefly[o] + '" name="numeracy_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="numeracy_question_1_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="numeracy_question_1_c_' + housefly[o] + '" name="numeracy_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="numeracy_question_1_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="numeracy_question_1_d_' + housefly[o] + '" name="numeracy_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="numeracy_question_1_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I can recognise and write numbers <input type="text" class="form-control" id="numeracy_question_2_first_input_' + housefly[o] + '" style="width:35px!important;" value="' + front3[r] + '"> to <input type="text" class="form-control" id="numeracy_question_2_second_input_' + housefly[o] + '" style="width:60px!important;" value="' + front4[s] + '"></td><td><form action="POST" class="col-11"><input type="radio" id="numeracy_question_2_a_' + housefly[o] + '" name="numeracy_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="numeracy_question_2_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="numeracy_question_2_b_' + housefly[o] + '" name="numeracy_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="numeracy_question_2_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="numeracy_question_2_c_' + housefly[o] + '" name="numeracy_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="numeracy_question_2_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="numeracy_question_2_d_' + housefly[o] + '" name="numeracy_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="numeracy_question_2_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I can recognise these shapes <input type="text" class="form-control" id="numeracy_question_3_input_' + housefly[o] + '" style="width:450px!important;" value="' + front5[t] + '"></td><td><form action="POST" class="col-11"><input type="radio" id="numeracy_question_3_a_' + housefly[o] + '" name="numeracy_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="numeracy_question_3_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="numeracy_question_3_b_' + housefly[o] + '" name="numeracy_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="numeracy_question_3_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="numeracy_question_3_c_' + housefly[o] + '" name="numeracy_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="numeracy_question_3_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="numeracy_question_3_d_' + housefly[o] + '" name="numeracy_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="numeracy_question_3_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I can recognise these colours <input type="text" class="form-control" id="numeracy_question_4_input_' + housefly[o] + '" style="width:450px!important;" value="' + front6[u] + '"></td><td><form action="POST" class="col-11"><input type="radio" id="numeracy_question_4_a_' + housefly[o] + '" name="numeracy_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="numeracy_question_4_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="numeracy_question_4_b_' + housefly[o] + '" name="numeracy_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="numeracy_question_4_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="numeracy_question_4_c_' + housefly[o] + '" name="numeracy_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="numeracy_question_4_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="numeracy_question_4_d_' + housefly[o] + '" name="numeracy_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="numeracy_question_4_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I can put together numbers <input type="text" class="form-control" id="numeracy_question_5_first_input_' + housefly[o] + '" style="width:45px!important;" value="' + front7[v] + '"> to <input type="text" class="form-control" id="numeracy_question_5_second_input_' + housefly[o] + '" style="width:60px!important;" value="' + front8[w] + '"></td><td><form action="POST" class="col-11"><input type="radio" id="numeracy_question_5_a_' + housefly[o] + '" name="numeracy_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="numeracy_question_5_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="numeracy_question_5_b_' + housefly[o] + '" name="numeracy_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="numeracy_question_5_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="numeracy_question_5_c_' + housefly[o] + '" name="numeracy_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="numeracy_question_5_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="numeracy_question_5_d_' + housefly[o] + '" name="numeracy_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="numeracy_question_5_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody></table><br><div class="row col-12 ml-1"><input type="button" name="PREVIOUS" id="nurresultpreviousbtn" class="btn btn-outline-success col-1" value="PREVIOUS"><div class="col-10"></div><input type="button" name="NEXT" id="nurresultsavebtn" class="btn btn-outline-success col-1" value="NEXT"></div></div></div>');
    //                     let nurresultContents = document.getElementById("unique_card_1");
    //                     nurresultContents.classList.add("active");
    //                     if (chicken[z] == 'A') {
    //                         document.getElementById('numeracy_question_1_a_' + housefly[o]).checked = true;
    //                     } else if (chicken[z] == 'B') {
    //                         document.getElementById('numeracy_question_1_b_' + housefly[o]).checked = true;
    //                     } else if (chicken[z] == 'C') {
    //                         document.getElementById('numeracy_question_1_c_' + housefly[o]).checked = true;
    //                     } else if (chicken[z] == 'D') {
    //                         document.getElementById('numeracy_question_1_d_' + housefly[o]).checked = true;
    //                     }


    //                     if (fowl[x] == 'A') {
    //                         document.getElementById('numeracy_question_2_a_' + housefly[o]).checked = true;
    //                     } else if (fowl[x] == 'B') {
    //                         document.getElementById('numeracy_question_2_b_' + housefly[o]).checked = true;
    //                     } else if (fowl[x] == 'C') {
    //                         document.getElementById('numeracy_question_2_c_' + housefly[o]).checked = true;
    //                     } else if (fowl[x] == 'D') {
    //                         document.getElementById('numeracy_question_2_d_' + housefly[o]).checked = true;
    //                     }

    //                     if (cow[b] == 'A') {
    //                         document.getElementById('numeracy_question_3_a_' + housefly[o]).checked = true;
    //                     } else if (cow[b] == 'B') {
    //                         document.getElementById('numeracy_question_3_b_' + housefly[o]).checked = true;
    //                     } else if (cow[b] == 'C') {
    //                         document.getElementById('numeracy_question_3_c_' + housefly[o]).checked = true;
    //                     } else if (cow[b] == 'D') {
    //                         document.getElementById('numeracy_question_3_d_' + housefly[o]).checked = true;
    //                     }

    //                     if (sheep[c] == 'A') {
    //                         document.getElementById('numeracy_question_4_a_' + housefly[o]).checked = true;
    //                     } else if (sheep[c] == 'B') {
    //                         document.getElementById('numeracy_question_4_b_' + housefly[o]).checked = true;
    //                     } else if (sheep[c] == 'C') {
    //                         document.getElementById('numeracy_question_4_c_' + housefly[o]).checked = true;
    //                     } else if (sheep[c] == 'D') {
    //                         document.getElementById('numeracy_question_4_d_' + housefly[o]).checked = true;
    //                     }

    //                     if (goat[d] == 'A') {
    //                         document.getElementById('numeracy_question_5_a_' + housefly[o]).checked = true;
    //                     } else if (goat[d] == 'B') {
    //                         document.getElementById('numeracy_question_5_b_' + housefly[o]).checked = true;
    //                     } else if (goat[d] == 'C') {
    //                         document.getElementById('numeracy_question_5_c_' + housefly[o]).checked = true;
    //                     } else if (goat[d] == 'D') {
    //                         document.getElementById('numeracy_question_5_d_' + housefly[o]).checked = true;
    //                     }

    //                 } else if (selected_nurresulsubjectinput1 == 'SOCIAL SKILLS') {
    //                     $(".nurresultlistlist2").append('<div class="card" id="unique_card_' + housefly[o] + '"><div class="card-body"><h5>' + fish[y] + '</h5><h6>' + housefly[o] + '</h6><br><h7>' + selected_nurresulsubjectinput1 + '</h7><br><br><table class="table"><tbody><td>QUESTIONS</td><td>GRADES</td></tbody><tbody><td>I share my toy</td><td><form action="POST" class="col-11"><input type="radio" id="social_skills_question_1_a_' + housefly[o] + '" name="social_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="social_skills_question_1_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="social_skills_question_1_b_' + housefly[o] + '" name="social_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="social_skills_question_1_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="social_skills_question_1_c_' + housefly[o] + '" name="social_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="social_skills_question_1_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="social_skills_question_1_d_' + housefly[o] + '" name="social_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="social_skills_question_1_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I drink without spilling</td><td><form action="POST" class="col-11"><input type="radio" id="social_skills_question_2_a_' + housefly[o] + '" name="social_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="social_skills_question_2_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="social_skills_question_2_b_' + housefly[o] + '" name="social_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="social_skills_question_2_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="social_skills_question_2_c_' + housefly[o] + '" name="social_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="social_skills_question_2_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="social_skills_question_2_d_' + housefly[o] + '" name="social_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="social_skills_question_2_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I hold spoon, food gets to my mouth</td><td><form action="POST" class="col-11"><input type="radio" id="social_skills_question_3_a_' + housefly[o] + '" name="social_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="social_skills_question_3_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="social_skills_question_3_b_' + housefly[o] + '" name="social_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="social_skills_question_3_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="social_skills_question_3_c_' + housefly[o] + '" name="social_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="social_skills_question_3_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="social_skills_question_3_d_' + housefly[o] + '" name="social_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="social_skills_question_3_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I take care of things</td><td><form action="POST" class="col-11"><input type="radio" id="social_skills_question_4_a_' + housefly[o] + '" name="social_skills_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="social_skills_question_4_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="social_skills_question_4_b_' + housefly[o] + '" name="social_skills_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="social_skills_question_4_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="social_skills_question_4_c_' + housefly[o] + '" name="social_skills_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="social_skills_question_4_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="social_skills_question_4_d_' + housefly[o] + '" name="social_skills_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="social_skills_question_4_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I am happy at work</td><td><form action="POST" class="col-11"><input type="radio" id="social_skills_question_5_a_' + housefly[o] + '" name="social_skills_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="social_skills_question_5_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="social_skills_question_5_b_' + housefly[o] + '" name="social_skills_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="social_skills_question_5_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="social_skills_question_5_c_' + housefly[o] + '" name="social_skills_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="social_skills_question_5_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="social_skills_question_5_d_' + housefly[o] + '" name="social_skills_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="social_skills_question_5_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I am happy at play</td><td><form action="POST" class="col-11"><input type="radio" id="social_skills_question_6_a_' + housefly[o] + '" name="social_skills_question_6_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="social_skills_question_6_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="social_skills_question_6_b_' + housefly[o] + '" name="social_skills_question_6_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="social_skills_question_6_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="social_skills_question_6_c_' + housefly[o] + '" name="social_skills_question_6_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="social_skills_question_6_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="social_skills_question_6_d_' + housefly[o] + '" name="social_skills_question_6_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="social_skills_question_6_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I play with others</td><td><form action="POST" class="col-11"><input type="radio" id="social_skills_question_7_a_' + housefly[o] + '" name="social_skills_question_7_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="social_skills_question_7_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="social_skills_question_7_b_' + housefly[o] + '" name="social_skills_question_7_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="social_skills_question_7_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="social_skills_question_7_c_' + housefly[o] + '" name="social_skills_question_7_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="social_skills_question_7_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="social_skills_question_7_d_' + housefly[o] + '" name="social_skills_question_7_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="social_skills_question_7_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I use toilet with/without help</td><td><form action="POST" class="col-11"><input type="radio" id="social_skills_question_8_a_' + housefly[o] + '" name="social_skills_question_8_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="social_skills_question_8_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="social_skills_question_8_b_' + housefly[o] + '" name="social_skills_question_8_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="social_skills_question_8_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="social_skills_question_8_c_' + housefly[o] + '" name="social_skills_question_8_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="social_skills_question_8_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="social_skills_question_8_d_' + housefly[o] + '" name="social_skills_question_8_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="social_skills_question_8_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I help tidy up</td><td><form action="POST" class="col-11"><input type="radio" id="social_skills_question_9_a_' + housefly[o] + '" name="social_skills_question_9_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="social_skills_question_9_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="social_skills_question_9_b_' + housefly[o] + '" name="social_skills_question_9_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="social_skills_question_9_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="social_skills_question_9_c_' + housefly[o] + '" name="social_skills_question_9_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="social_skills_question_9_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="social_skills_question_9_d_' + housefly[o] + '" name="social_skills_question_9_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="social_skills_question_9_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I follow simple instructions</td><td><form action="POST" class="col-11"><input type="radio" id="social_skills_question_10_a_' + housefly[o] + '" name="social_skills_question_10_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="social_skills_question_10_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="social_skills_question_10_b_' + housefly[o] + '" name="social_skills_question_10_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="social_skills_question_10_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="social_skills_question_10_c_' + housefly[o] + '" name="social_skills_question_10_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="social_skills_question_10_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="social_skills_question_10_d_' + housefly[o] + '" name="social_skills_question_10_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="social_skills_question_10_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I dont fight, snatch or throw things</td><td><form action="POST" class="col-11"><input type="radio" id="social_skills_question_11_a_' + housefly[o] + '" name="social_skills_question_11_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="social_skills_question_11_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="social_skills_question_11_b_' + housefly[o] + '" name="social_skills_question_11_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="social_skills_question_11_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="social_skills_question_11_c_' + housefly[o] + '" name="social_skills_question_11_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="social_skills_question_11_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="social_skills_question_11_d_' + housefly[o] + '" name="social_skills_question_11_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="social_skills_question_11_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I dont shout or scream</td><td><form action="POST" class="col-11"><input type="radio" id="social_skills_question_12_a_' + housefly[o] + '" name="social_skills_question_12_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="social_skills_question_12_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="social_skills_question_12_b_' + housefly[o] + '" name="social_skills_question_12_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="social_skills_question_12_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="social_skills_question_12_c_' + housefly[o] + '" name="social_skills_question_12_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="social_skills_question_12_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="social_skills_question_12_d_' + housefly[o] + '" name="social_skills_question_12_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="social_skills_question_12_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody></table><br><div class="row col-12 ml-1"><input type="button" name="PREVIOUS" id="nurresultpreviousbtn" class="btn btn-outline-success col-1" value="PREVIOUS"><div class="col-10"></div><input type="button" name="NEXT" id="nurresultsavebtn" class="btn btn-outline-success col-1" value="NEXT"></div></div></div>');
    //                     let nurresultContents = document.getElementById("unique_card_1");
    //                     nurresultContents.classList.add("active");
    //                     if (chicken[z] == 'A') {
    //                         document.getElementById('social_skills_question_1_a_' + housefly[o]).checked = true;
    //                     } else if (chicken[z] == 'B') {
    //                         document.getElementById('social_skills_question_1_b_' + housefly[o]).checked = true;
    //                     } else if (chicken[z] == 'C') {
    //                         document.getElementById('social_skills_question_1_c_' + housefly[o]).checked = true;
    //                     } else if (chicken[z] == 'D') {
    //                         document.getElementById('social_skills_question_1_d_' + housefly[o]).checked = true;
    //                     }


    //                     if (fowl[x] == 'A') {
    //                         document.getElementById('social_skills_question_2_a_' + housefly[o]).checked = true;
    //                     } else if (fowl[x] == 'B') {
    //                         document.getElementById('social_skills_question_2_b_' + housefly[o]).checked = true;
    //                     } else if (fowl[x] == 'C') {
    //                         document.getElementById('social_skills_question_2_c_' + housefly[o]).checked = true;
    //                     } else if (fowl[x] == 'D') {
    //                         document.getElementById('social_skills_question_2_d_' + housefly[o]).checked = true;
    //                     }

    //                     if (cow[b] == 'A') {
    //                         document.getElementById('social_skills_question_3_a_' + housefly[o]).checked = true;
    //                     } else if (cow[b] == 'B') {
    //                         document.getElementById('social_skills_question_3_b_' + housefly[o]).checked = true;
    //                     } else if (cow[b] == 'C') {
    //                         document.getElementById('social_skills_question_3_c_' + housefly[o]).checked = true;
    //                     } else if (cow[b] == 'D') {
    //                         document.getElementById('social_skills_question_3_d_' + housefly[o]).checked = true;
    //                     }

    //                     if (sheep[c] == 'A') {
    //                         document.getElementById('social_skills_question_4_a_' + housefly[o]).checked = true;
    //                     } else if (sheep[c] == 'B') {
    //                         document.getElementById('social_skills_question_4_b_' + housefly[o]).checked = true;
    //                     } else if (sheep[c] == 'C') {
    //                         document.getElementById('social_skills_question_4_c_' + housefly[o]).checked = true;
    //                     } else if (sheep[c] == 'D') {
    //                         document.getElementById('social_skills_question_4_d_' + housefly[o]).checked = true;
    //                     }

    //                     if (goat[d] == 'A') {
    //                         document.getElementById('social_skills_question_5_a_' + housefly[o]).checked = true;
    //                     } else if (goat[d] == 'B') {
    //                         document.getElementById('social_skills_question_5_b_' + housefly[o]).checked = true;
    //                     } else if (goat[d] == 'C') {
    //                         document.getElementById('social_skills_question_5_c_' + housefly[o]).checked = true;
    //                     } else if (goat[d] == 'D') {
    //                         document.getElementById('social_skills_question_5_d_' + housefly[o]).checked = true;
    //                     }

    //                     if (snake[f] == 'A') {
    //                         document.getElementById('social_skills_question_6_a_' + housefly[o]).checked = true;
    //                     } else if (snake[f] == 'B') {
    //                         document.getElementById('social_skills_question_6_b_' + housefly[o]).checked = true;
    //                     } else if (snake[f] == 'C') {
    //                         document.getElementById('social_skills_question_6_c_' + housefly[o]).checked = true;
    //                     } else if (snake[f] == 'D') {
    //                         document.getElementById('social_skills_question_6_d_' + housefly[o]).checked = true;
    //                     }

    //                     if (rabbit[g] == 'A') {
    //                         document.getElementById('social_skills_question_7_a_' + housefly[o]).checked = true;
    //                     } else if (rabbit[g] == 'B') {
    //                         document.getElementById('social_skills_question_7_b_' + housefly[o]).checked = true;
    //                     } else if (rabbit[g] == 'C') {
    //                         document.getElementById('social_skills_question_7_c_' + housefly[o]).checked = true;
    //                     } else if (rabbit[g] == 'D') {
    //                         document.getElementById('social_skills_question_7_d_' + housefly[o]).checked = true;
    //                     }

    //                     if (chic[h] == 'A') {
    //                         document.getElementById('social_skills_question_8_a_' + housefly[o]).checked = true;
    //                     } else if (chic[h] == 'B') {
    //                         document.getElementById('social_skills_question_8_b_' + housefly[o]).checked = true;
    //                     } else if (chic[h] == 'C') {
    //                         document.getElementById('social_skills_question_8_c_' + housefly[o]).checked = true;
    //                     } else if (chic[h] == 'D') {
    //                         document.getElementById('social_skills_question_8_d_' + housefly[o]).checked = true;
    //                     }

    //                     if (hen[i] == 'A') {
    //                         document.getElementById('social_skills_question_9_a_' + housefly[o]).checked = true;
    //                     } else if (hen[i] == 'B') {
    //                         document.getElementById('social_skills_question_9_b_' + housefly[o]).checked = true;
    //                     } else if (hen[i] == 'C') {
    //                         document.getElementById('social_skills_question_9_c_' + housefly[o]).checked = true;
    //                     } else if (hen[i] == 'D') {
    //                         document.getElementById('social_skills_question_9_d_' + housefly[o]).checked = true;
    //                     }

    //                     if (whale[j] == 'A') {
    //                         document.getElementById('social_skills_question_10_a_' + housefly[o]).checked = true;
    //                     } else if (whale[j] == 'B') {
    //                         document.getElementById('social_skills_question_10_b_' + housefly[o]).checked = true;
    //                     } else if (whale[j] == 'C') {
    //                         document.getElementById('social_skills_question_10_c_' + housefly[o]).checked = true;
    //                     } else if (whale[j] == 'D') {
    //                         document.getElementById('social_skills_question_10_d_' + housefly[o]).checked = true;
    //                     }

    //                     if (shark[k] == 'A') {
    //                         document.getElementById('social_skills_question_11_a_' + housefly[o]).checked = true;
    //                     } else if (shark[k] == 'B') {
    //                         document.getElementById('social_skills_question_11_b_' + housefly[o]).checked = true;
    //                     } else if (shark[k] == 'C') {
    //                         document.getElementById('social_skills_question_11_c_' + housefly[o]).checked = true;
    //                     } else if (shark[k] == 'D') {
    //                         document.getElementById('social_skills_question_11_d_' + housefly[o]).checked = true;
    //                     }

    //                     if (dolphin[l] == 'A') {
    //                         document.getElementById('social_skills_question_12_a_' + housefly[o]).checked = true;
    //                     } else if (dolphin[l] == 'B') {
    //                         document.getElementById('social_skills_question_12_b_' + housefly[o]).checked = true;
    //                     } else if (dolphin[l] == 'C') {
    //                         document.getElementById('social_skills_question_12_c_' + housefly[o]).checked = true;
    //                     } else if (dolphin[l] == 'D') {
    //                         document.getElementById('social_skills_question_12_d_' + housefly[o]).checked = true;
    //                     }
    //                 } else if (selected_nurresulsubjectinput1 == 'EMOTIONAL SKILLS') {
    //                     $(".nurresultlistlist2").append('<div class="card" id="unique_card_' + housefly[o] + '"><div class="card-body"><h5>' + fish[y] + '</h5><h6>' + housefly[o] + '</h6><br><h7>' + selected_nurresulsubjectinput1 + '</h7><br><br><table class="table"><tbody><td>QUESTIONS</td><td>GRADES</td></tbody><tbody><td>I respect and show concern for people around me</td><td><form action="POST" class="col-11"><input type="radio" id="emotional_skills_question_1_a_' + housefly[o] + '" name="emotional_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="emotional_skills_question_1_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="emotional_skills_question_1_b_' + housefly[o] + '" name="emotional_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="emotional_skills_question_1_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="emotional_skills_question_1_c_' + housefly[o] + '" name="emotional_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="emotional_skills_question_1_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="emotional_skills_question_1_d_' + housefly[o] + '" name="emotional_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="emotional_skills_question_1_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I accept and respond to my teachers authority</td><td><form action="POST" class="col-11"><input type="radio" id="emotional_skills_question_2_a_' + housefly[o] + '" name="emotional_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="emotional_skills_question_2_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="emotional_skills_question_2_b_' + housefly[o] + '" name="emotional_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="emotional_skills_question_2_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="emotional_skills_question_2_c_' + housefly[o] + '" name="emotional_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="emotional_skills_question_2_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="emotional_skills_question_2_d_' + housefly[o] + '" name="emotional_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="emotional_skills_question_2_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I play and share with other children</td><td><form action="POST" class="col-11"><input type="radio" id="emotional_skills_question_3_a_' + housefly[o] + '" name="emotional_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="emotional_skills_question_3_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="emotional_skills_question_3_b_' + housefly[o] + '" name="emotional_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="emotional_skills_question_3_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="emotional_skills_question_3_c_' + housefly[o] + '" name="emotional_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="emotional_skills_question_3_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="emotional_skills_question_3_d_' + housefly[o] + '" name="emotional_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="emotional_skills_question_3_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I am happy and cheerful at school</td><td><form action="POST" class="col-11"><input type="radio" id="emotional_skills_question_4_a_' + housefly[o] + '" name="emotional_skills_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="emotional_skills_question_4_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="emotional_skills_question_4_b_' + housefly[o] + '" name="emotional_skills_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="emotional_skills_question_4_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="emotional_skills_question_4_c_' + housefly[o] + '" name="emotional_skills_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="emotional_skills_question_4_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="emotional_skills_question_4_d_' + housefly[o] + '" name="emotional_skills_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="emotional_skills_question_4_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody></table><br><div class="row col-12 ml-1"><input type="button" name="PREVIOUS" id="nurresultpreviousbtn" class="btn btn-outline-success col-1" value="PREVIOUS"><div class="col-10"></div><input type="button" name="NEXT" id="nurresultsavebtn" class="btn btn-outline-success col-1" value="NEXT"></div></div></div>');
    //                     let nurresultContents = document.getElementById("unique_card_1");
    //                     nurresultContents.classList.add("active");
    //                     if (chicken[z] == 'A') {
    //                         document.getElementById('emotional_skills_question_1_a_' + housefly[o]).checked = true;
    //                     } else if (chicken[z] == 'B') {
    //                         document.getElementById('emotional_skills_question_1_b_' + housefly[o]).checked = true;
    //                     } else if (chicken[z] == 'C') {
    //                         document.getElementById('emotional_skills_question_1_c_' + housefly[o]).checked = true;
    //                     } else if (chicken[z] == 'D') {
    //                         document.getElementById('emotional_skills_question_1_d_' + housefly[o]).checked = true;
    //                     }


    //                     if (fowl[x] == 'A') {
    //                         document.getElementById('emotional_skills_question_2_a_' + housefly[o]).checked = true;
    //                     } else if (fowl[x] == 'B') {
    //                         document.getElementById('emotional_skills_question_2_b_' + housefly[o]).checked = true;
    //                     } else if (fowl[x] == 'C') {
    //                         document.getElementById('emotional_skills_question_2_c_' + housefly[o]).checked = true;
    //                     } else if (fowl[x] == 'D') {
    //                         document.getElementById('emotional_skills_question_2_d_' + housefly[o]).checked = true;
    //                     }

    //                     if (cow[b] == 'A') {
    //                         document.getElementById('emotional_skills_question_3_a_' + housefly[o]).checked = true;
    //                     } else if (cow[b] == 'B') {
    //                         document.getElementById('emotional_skills_question_3_b_' + housefly[o]).checked = true;
    //                     } else if (cow[b] == 'C') {
    //                         document.getElementById('emotional_skills_question_3_c_' + housefly[o]).checked = true;
    //                     } else if (cow[b] == 'D') {
    //                         document.getElementById('emotional_skills_question_3_d_' + housefly[o]).checked = true;
    //                     }

    //                     if (sheep[c] == 'A') {
    //                         document.getElementById('emotional_skills_question_4_a_' + housefly[o]).checked = true;
    //                     } else if (sheep[c] == 'B') {
    //                         document.getElementById('emotional_skills_question_4_b_' + housefly[o]).checked = true;
    //                     } else if (sheep[c] == 'C') {
    //                         document.getElementById('emotional_skills_question_4_c_' + housefly[o]).checked = true;
    //                     } else if (sheep[c] == 'D') {
    //                         document.getElementById('emotional_skills_question_4_d_' + housefly[o]).checked = true;
    //                     }
    //                 } else if (selected_nurresulsubjectinput1 == 'FINE MOTOR SKILLS') {
    //                     $(".nurresultlistlist2").append('<div class="card" id="unique_card_' + housefly[o] + '"><div class="card-body"><h5>' + fish[y] + '</h5><h6>' + housefly[o] + '</h6><br><h7>' + selected_nurresulsubjectinput1 + '</h7><br><br><table class="table"><tbody><td>QUESTIONS</td><td>GRADES</td></tbody><tbody><td>I can construct a cube tower</td><td><form action="POST" class="col-11"><input type="radio" id="fine_motor_skills_question_1_a_' + housefly[o] + '" name="fine_motor_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="fine_motor_skills_question_1_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="fine_motor_skills_question_1_b_' + housefly[o] + '" name="fine_motor_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="fine_motor_skills_question_1_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="fine_motor_skills_question_1_c_' + housefly[o] + '" name="fine_motor_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="fine_motor_skills_question_1_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="fine_motor_skills_question_1_d_' + housefly[o] + '" name="fine_motor_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="fine_motor_skills_question_1_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I can paint</td><td><form action="POST" class="col-11"><input type="radio" id="fine_motor_skills_question_2_a_' + housefly[o] + '" name="fine_motor_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="fine_motor_skills_question_2_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="fine_motor_skills_question_2_b_' + housefly[o] + '" name="fine_motor_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="fine_motor_skills_question_2_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="fine_motor_skills_question_2_c_' + housefly[o] + '" name="fine_motor_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="c"><label for="fine_motor_skills_question_2_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="fine_motor_skills_question_2_d_' + housefly[o] + '" name="fine_motor_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="fine_motor_skills_question_2_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I can paste and glue</td><td><form action="POST" class="col-11"><input type="radio" id="fine_motor_skills_question_3_a_' + housefly[o] + '" name="fine_motor_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="fine_motor_skills_question_3_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="fine_motor_skills_question_3_b_' + housefly[o] + '" name="fine_motor_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="fine_motor_skills_question_3_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="fine_motor_skills_question_3_c_' + housefly[o] + '" name="fine_motor_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="fine_motor_skills_question_3_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="fine_motor_skills_question_3_d_' + housefly[o] + '" name="fine_motor_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="fine_motor_skills_question_3_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I finish what I start</td><td><form action="POST" class="col-11"><input type="radio" id="fine_motor_skills_question_4_a_' + housefly[o] + '" name="fine_motor_skills_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="fine_motor_skills_question_4_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="fine_motor_skills_question_4_b_' + housefly[o] + '" name="fine_motor_skills_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="fine_motor_skills_question_4_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="fine_motor_skills_question_4_c_' + housefly[o] + '" name="fine_motor_skills_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="fine_motor_skills_question_4_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="fine_motor_skills_question_4_d_' + housefly[o] + '" name="fine_motor_skills_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="fine_motor_skills_question_4_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I can thread large beads/buttons together</td><td><form action="POST" class="col-11"><input type="radio" id="fine_motor_skills_question_5_a_' + housefly[o] + '" name="fine_motor_skills_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="fine_motor_skills_question_5_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="fine_motor_skills_question_5_b_' + housefly[o] + '" name="fine_motor_skills_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="fine_motor_skills_question_5_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="fine_motor_skills_question_5_c_' + housefly[o] + '" name="fine_motor_skills_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="fine_motor_skills_question_5_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="fine_motor_skills_question_5_d_' + housefly[o] + '" name="fine_motor_skills_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="fine_motor_skills_question_5_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I can fix objects(puzzles)</td><td><form action="POST" class="col-11"><input type="radio" id="fine_motor_skills_question_6_a_' + housefly[o] + '" name="fine_motor_skills_question_6_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="fine_motor_skills_question_6_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="fine_motor_skills_question_6_b_' + housefly[o] + '" name="fine_motor_skills_question_6_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="fine_motor_skills_question_6_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="fine_motor_skills_question_6_c_' + housefly[o] + '" name="fine_motor_skills_question_6_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="fine_motor_skills_question_6_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="fine_motor_skills_question_6_d_' + housefly[o] + '" name="fine_motor_skills_question_6_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="fine_motor_skills_question_6_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I can lace objects</td><td><form action="POST" class="col-11"><input type="radio" id="fine_motor_skills_question_7_a_' + housefly[o] + '" name="fine_motor_skills_question_7_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="fine_motor_skills_question_7_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="fine_motor_skills_question_7_b_' + housefly[o] + '" name="fine_motor_skills_question_7_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="fine_motor_skills_question_7_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="fine_motor_skills_question_7_c_' + housefly[o] + '" name="fine_motor_skills_question_7_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="fine_motor_skills_question_7_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="fine_motor_skills_question_7_d_' + housefly[o] + '" name="fine_motor_skills_question_7_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="fine_motor_skills_question_7_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I can use scissors</td><td><form action="POST" class="col-11"><input type="radio" id="fine_motor_skills_question_8_a_' + housefly[o] + '" name="fine_motor_skills_question_8_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="fine_motor_skills_question_8_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="fine_motor_skills_question_8_b_' + housefly[o] + '" name="fine_motor_skills_question_8_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="fine_motor_skills_question_8_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="fine_motor_skills_question_8_c_' + housefly[o] + '" name="fine_motor_skills_question_8_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="fine_motor_skills_question_8_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="fine_motor_skills_question_8_d_' + housefly[o] + '" name="fine_motor_skills_question_8_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="fine_motor_skills_question_8_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody></table><br><div class="row col-12 ml-1"><input type="button" name="PREVIOUS" id="nurresultpreviousbtn" class="btn btn-outline-success col-1" value="PREVIOUS"><div class="col-10"></div><input type="button" name="NEXT" id="nurresultsavebtn" class="btn btn-outline-success col-1" value="NEXT"></div></div></div>');
    //                     let nurresultContents = document.getElementById("unique_card_1");
    //                     nurresultContents.classList.add("active");
    //                     if (chicken[z] == 'A') {
    //                         document.getElementById('fine_motor_skills_question_1_a_' + housefly[o]).checked = true;
    //                     } else if (chicken[z] == 'B') {
    //                         document.getElementById('fine_motor_skills_question_1_b_' + housefly[o]).checked = true;
    //                     } else if (chicken[z] == 'C') {
    //                         document.getElementById('fine_motor_skills_question_1_c_' + housefly[o]).checked = true;
    //                     } else if (chicken[z] == 'D') {
    //                         document.getElementById('fine_motor_skills_question_1_d_' + housefly[o]).checked = true;
    //                     }


    //                     if (fowl[x] == 'A') {
    //                         document.getElementById('fine_motor_skills_question_2_a_' + housefly[o]).checked = true;
    //                     } else if (fowl[x] == 'B') {
    //                         document.getElementById('fine_motor_skills_question_2_b_' + housefly[o]).checked = true;
    //                     } else if (fowl[x] == 'C') {
    //                         document.getElementById('fine_motor_skills_question_2_c_' + housefly[o]).checked = true;
    //                     } else if (fowl[x] == 'D') {
    //                         document.getElementById('fine_motor_skills_question_2_d_' + housefly[o]).checked = true;
    //                     }

    //                     if (cow[b] == 'A') {
    //                         document.getElementById('fine_motor_skills_question_3_a_' + housefly[o]).checked = true;
    //                     } else if (cow[b] == 'B') {
    //                         document.getElementById('fine_motor_skills_question_3_b_' + housefly[o]).checked = true;
    //                     } else if (cow[b] == 'C') {
    //                         document.getElementById('fine_motor_skills_question_3_c_' + housefly[o]).checked = true;
    //                     } else if (cow[b] == 'D') {
    //                         document.getElementById('fine_motor_skills_question_3_d_' + housefly[o]).checked = true;
    //                     }

    //                     if (sheep[c] == 'A') {
    //                         document.getElementById('fine_motor_skills_question_4_a_' + housefly[o]).checked = true;
    //                     } else if (sheep[c] == 'B') {
    //                         document.getElementById('fine_motor_skills_question_4_b_' + housefly[o]).checked = true;
    //                     } else if (sheep[c] == 'C') {
    //                         document.getElementById('fine_motor_skills_question_4_c_' + housefly[o]).checked = true;
    //                     } else if (sheep[c] == 'D') {
    //                         document.getElementById('fine_motor_skills_question_4_d_' + housefly[o]).checked = true;
    //                     }

    //                     if (goat[d] == 'A') {
    //                         document.getElementById('fine_motor_skills_question_5_a_' + housefly[o]).checked = true;
    //                     } else if (goat[d] == 'B') {
    //                         document.getElementById('fine_motor_skills_question_5_b_' + housefly[o]).checked = true;
    //                     } else if (goat[d] == 'C') {
    //                         document.getElementById('fine_motor_skills_question_5_c_' + housefly[o]).checked = true;
    //                     } else if (goat[d] == 'D') {
    //                         document.getElementById('fine_motor_skills_question_5_d_' + housefly[o]).checked = true;
    //                     }

    //                     if (snake[f] == 'A') {
    //                         document.getElementById('fine_motor_skills_question_6_a_' + housefly[o]).checked = true;
    //                     } else if (snake[f] == 'B') {
    //                         document.getElementById('fine_motor_skills_question_6_b_' + housefly[o]).checked = true;
    //                     } else if (snake[f] == 'C') {
    //                         document.getElementById('fine_motor_skills_question_6_c_' + housefly[o]).checked = true;
    //                     } else if (snake[f] == 'D') {
    //                         document.getElementById('fine_motor_skills_question_6_d_' + housefly[o]).checked = true;
    //                     }

    //                     if (rabbit[g] == 'A') {
    //                         document.getElementById('fine_motor_skills_question_7_a_' + housefly[o]).checked = true;
    //                     } else if (rabbit[g] == 'B') {
    //                         document.getElementById('fine_motor_skills_question_7_b_' + housefly[o]).checked = true;
    //                     } else if (rabbit[g] == 'C') {
    //                         document.getElementById('fine_motor_skills_question_7_c_' + housefly[o]).checked = true;
    //                     } else if (rabbit[g] == 'D') {
    //                         document.getElementById('fine_motor_skills_question_7_d_' + housefly[o]).checked = true;
    //                     }

    //                     if (chic[h] == 'A') {
    //                         document.getElementById('fine_motor_skills_question_8_a_' + housefly[o]).checked = true;
    //                     } else if (chic[h] == 'B') {
    //                         document.getElementById('fine_motor_skills_question_8_b_' + housefly[o]).checked = true;
    //                     } else if (chic[h] == 'C') {
    //                         document.getElementById('fine_motor_skills_question_8_c_' + housefly[o]).checked = true;
    //                     } else if (chic[h] == 'D') {
    //                         document.getElementById('fine_motor_skills_question_8_d_' + housefly[o]).checked = true;
    //                     }
    //                 } else if (selected_nurresulsubjectinput1 == 'GROSS MOTOR SKILLS') {
    //                     $(".nurresultlistlist2").append('<div class="card" id="unique_card_' + housefly[o] + '"><div class="card-body"><h5>' + fish[y] + '</h5><h6>' + housefly[o] + '</h6><br><h7>' + selected_nurresulsubjectinput1 + '</h7><br><br><table class="table"><tbody><td>QUESTIONS</td><td>GRADES</td></tbody><tbody><td>I can co-ordinate my body movements</td><td><form action="POST" class="col-11"><input type="radio" id="gross_motor_skills_question_1_a_' + housefly[o] + '" name="gross_motor_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="gross_motor_skills_question_1_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="gross_motor_skills_question_1_b_' + housefly[o] + '" name="gross_motor_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="gross_motor_skills_question_1_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="gross_motor_skills_question_1_c_' + housefly[o] + '" name="gross_motor_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="gross_motor_skills_question_1_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="gross_motor_skills_question_1_d_' + housefly[o] + '" name="gross_motor_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="gross_motor_skills_question_1_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I like outdoor play</td><td><form action="POST" class="col-11"><input type="radio" id="gross_motor_skills_question_2_a_' + housefly[o] + '" name="gross_motor_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="gross_motor_skills_question_2_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="gross_motor_skills_question_2_b_' + housefly[o] + '" name="gross_motor_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="gross_motor_skills_question_2_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="gross_motor_skills_question_2_c_' + housefly[o] + '" name="gross_motor_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="gross_motor_skills_question_2_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="gross_motor_skills_question_2_d_' + housefly[o] + '" name="gross_motor_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="gross_motor_skills_question_2_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I dance and play games</td><td><form action="POST" class="col-11"><input type="radio" id="gross_motor_skills_question_3_a_' + housefly[o] + '" name="gross_motor_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="gross_motor_skills_question_3_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="gross_motor_skills_question_3_b_' + housefly[o] + '" name="gross_motor_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="gross_motor_skills_question_3_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="gross_motor_skills_question_3_c_' + housefly[o] + '" name="gross_motor_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="gross_motor_skills_question_3_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="gross_motor_skills_question_3_d_' + housefly[o] + '" name="gross_motor_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="gross_motor_skills_question_3_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody></table><br><div class="row col-12 ml-1"><input type="button" name="PREVIOUS" id="nurresultpreviousbtn" class="btn btn-outline-success col-1" value="PREVIOUS"><div class="col-10"></div><input type="button" name="NEXT" id="nurresultsavebtn" class="btn btn-outline-success col-1" value="NEXT"></div></div></div>');
    //                     let nurresultContents = document.getElementById("unique_card_1");
    //                     nurresultContents.classList.add("active");
    //                     if (chicken[z] == 'A') {
    //                         document.getElementById('gross_motor_skills_question_1_a_' + housefly[o]).checked = true;
    //                     } else if (chicken[z] == 'B') {
    //                         document.getElementById('gross_motor_skills_question_1_b_' + housefly[o]).checked = true;
    //                     } else if (chicken[z] == 'C') {
    //                         document.getElementById('gross_motor_skills_question_1_c_' + housefly[o]).checked = true;
    //                     } else if (chicken[z] == 'D') {
    //                         document.getElementById('gross_motor_skills_question_1_d_' + housefly[o]).checked = true;
    //                     }


    //                     if (fowl[x] == 'A') {
    //                         document.getElementById('gross_motor_skills_question_2_a_' + housefly[o]).checked = true;
    //                     } else if (fowl[x] == 'B') {
    //                         document.getElementById('gross_motor_skills_question_2_b_' + housefly[o]).checked = true;
    //                     } else if (fowl[x] == 'C') {
    //                         document.getElementById('gross_motor_skills_question_2_c_' + housefly[o]).checked = true;
    //                     } else if (fowl[x] == 'D') {
    //                         document.getElementById('gross_motor_skills_question_2_d_' + housefly[o]).checked = true;
    //                     }

    //                     if (cow[b] == 'A') {
    //                         document.getElementById('gross_motor_skills_question_3_a_' + housefly[o]).checked = true;
    //                     } else if (cow[b] == 'B') {
    //                         document.getElementById('gross_motor_skills_question_3_b_' + housefly[o]).checked = true;
    //                     } else if (cow[b] == 'C') {
    //                         document.getElementById('gross_motor_skills_question_3_c_' + housefly[o]).checked = true;
    //                     } else if (cow[b] == 'D') {
    //                         document.getElementById('gross_motor_skills_question_3_d_' + housefly[o]).checked = true;
    //                     }
    //                 } else if (selected_nurresulsubjectinput1 == 'ICT SKILLS (COMPUTER)') {
    //                     $(".nurresultlistlist2").append('<div class="card" id="unique_card_' + housefly[o] + '"><div class="card-body"><h5>' + fish[y] + '</h5><h6>' + housefly[o] + '</h6><br><h7>' + selected_nurresulsubjectinput1 + '</h7><br><br><table class="table"><tbody><td>QUESTIONS</td><td>GRADES</td></tbody><tbody><td>I can identify the keyboard</td><td><form action="POST" class="col-11"><input type="radio" id="ict_skills_question_1_a_' + housefly[o] + '" name="ict_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="ict_skills_question_1_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="ict_skills_question_1_b_' + housefly[o] + '" name="ict_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="ict_skills_question_1_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="ict_skills_question_1_c_' + housefly[o] + '" name="ict_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="ict_skills_question_1_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="ict_skills_question_1_d_' + housefly[o] + '" name="ict_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="ict_skills_question_1_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I can match computer parts to their names</td><td><form action="POST" class="col-11"><input type="radio" id="ict_skills_question_2_a_' + housefly[o] + '" name="ict_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="ict_skills_question_2_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="ict_skills_question_2_b_' + housefly[o] + '" name="ict_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="ict_skills_question_2_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="ict_skills_question_2_c_' + housefly[o] + '" name="ict_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="ict_skills_question_2_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="ict_skills_question_2_d_' + housefly[o] + '" name="ict_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="ict_skills_question_2_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I can press the keys on the keyboard normally</td><td><form action="POST" class="col-11"><input type="radio" id="ict_skills_question_3_a_' + housefly[o] + '" name="ict_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="ict_skills_question_3_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="ict_skills_question_3_b_' + housefly[o] + '" name="ict_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="ict_skills_question_3_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="ict_skills_question_3_c_' + housefly[o] + '" name="ict_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="ict_skills_question_3_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="ict_skills_question_3_d_' + housefly[o] + '" name="ict_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="ict_skills_question_3_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody></table><br><div class="row col-12 ml-1"><input type="button" name="PREVIOUS" id="nurresultpreviousbtn" class="btn btn-outline-success col-1" value="PREVIOUS"><div class="col-10"></div><input type="button" name="NEXT" id="nurresultsavebtn" class="btn btn-outline-success col-1" value="NEXT"></div></div></div>');
    //                     let nurresultContents = document.getElementById("unique_card_1");
    //                     nurresultContents.classList.add("active");
    //                     if (chicken[z] == 'A') {
    //                         document.getElementById('ict_skills_question_1_a_' + housefly[o]).checked = true;
    //                     } else if (chicken[z] == 'B') {
    //                         document.getElementById('ict_skills_question_1_b_' + housefly[o]).checked = true;
    //                     } else if (chicken[z] == 'C') {
    //                         document.getElementById('ict_skills_question_1_c_' + housefly[o]).checked = true;
    //                     } else if (chicken[z] == 'D') {
    //                         document.getElementById('ict_skills_question_1_d_' + housefly[o]).checked = true;
    //                     }


    //                     if (fowl[x] == 'A') {
    //                         document.getElementById('ict_skills_question_2_a_' + housefly[o]).checked = true;
    //                     } else if (fowl[x] == 'B') {
    //                         document.getElementById('ict_skills_question_2_b_' + housefly[o]).checked = true;
    //                     } else if (fowl[x] == 'C') {
    //                         document.getElementById('ict_skills_question_2_c_' + housefly[o]).checked = true;
    //                     } else if (fowl[x] == 'D') {
    //                         document.getElementById('ict_skills_question_2_d_' + housefly[o]).checked = true;
    //                     }

    //                     if (cow[b] == 'A') {
    //                         document.getElementById('ict_skills_question_3_a_' + housefly[o]).checked = true;
    //                     } else if (cow[b] == 'B') {
    //                         document.getElementById('ict_skills_question_3_b_' + housefly[o]).checked = true;
    //                     } else if (cow[b] == 'C') {
    //                         document.getElementById('ict_skills_question_3_c_' + housefly[o]).checked = true;
    //                     } else if (cow[b] == 'D') {
    //                         document.getElementById('ict_skills_question_3_d_' + housefly[o]).checked = true;
    //                     }
    //                 } else if (selected_nurresulsubjectinput1 == 'RHYMES AND SONGS (MUSIC)') {
    //                     $(".nurresultlistlist2").append('<div class="card" id="unique_card_' + housefly[o] + '"><div class="card-body"><h5>' + fish[y] + '</h5><h6>' + housefly[o] + '</h6><br><h7>' + selected_nurresulsubjectinput1 + '</h7><br><br><table class="table"><tbody><td>QUESTIONS</td><td>GRADES</td></tbody><tbody><td>I can enjoy music</td><td><form action="POST" class="col-11"><input type="radio" id="music_question_1_a_' + housefly[o] + '" name="music_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="music_question_1_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="music_question_1_b_' + housefly[o] + '" name="music_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="music_question_1_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="music_question_1_c_' + housefly[o] + '" name="music_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="music_question_1_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="music_question_1_d_' + housefly[o] + '" name="music_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="music_question_1_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I can sing and say rhymes</td><td><form action="POST" class="col-11"><input type="radio" id="music_question_2_a_' + housefly[o] + '" name="music_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="music_question_2_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="music_question_2_b_' + housefly[o] + '" name="music_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="music_question_2_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="music_question_2_c_' + housefly[o] + '" name="music_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="music_question_2_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="music_question_2_d_' + housefly[o] + '" name="music_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="music_question_2_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I participate in group songs and rhymes</td><td><form action="POST" class="col-11"><input type="radio" id="music_question_3_a_' + housefly[o] + '" name="music_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="music_question_3_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="music_question_3_b_' + housefly[o] + '" name="music_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="music_question_3_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="music_question_3_c_' + housefly[o] + '" name="music_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="music_question_3_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="music_question_3_d_' + housefly[o] + '" name="music_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="music_question_3_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I respond to rhythmic patterns</td><td><form action="POST" class="col-11"><input type="radio" id="music_question_4_a_' + housefly[o] + '" name="music_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="music_question_4_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="music_question_4_b_' + housefly[o] + '" name="music_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="music_question_4_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="music_question_4_c_' + housefly[o] + '" name="music_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="music_question_4_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="music_question_4_d_' + housefly[o] + '" name="music_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="music_question_4_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I enjoy demonstrating rhymes and songs</td><td><form action="POST" class="col-11"><input type="radio" id="music_question_5_a_' + housefly[o] + '" name="music_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="music_question_5_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="music_question_5_b_' + housefly[o] + '" name="music_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="music_question_5_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="music_question_5_c_' + housefly[o] + '" name="music_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="music_question_5_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="music_question_5_d_' + housefly[o] + '" name="music_question_5_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="music_question_5_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody></table><br><div class="row col-12 ml-1"><input type="button" name="PREVIOUS" id="nurresultpreviousbtn" class="btn btn-outline-success col-1" value="PREVIOUS"><div class="col-10"></div><input type="button" name="NEXT" id="nurresultsavebtn" class="btn btn-outline-success col-1" value="NEXT"></div></div></div>');
    //                     let nurresultContents = document.getElementById("unique_card_1");
    //                     nurresultContents.classList.add("active");
    //                     if (chicken[z] == 'A') {
    //                         document.getElementById('music_question_1_a_' + housefly[o]).checked = true;
    //                     } else if (chicken[z] == 'B') {
    //                         document.getElementById('music_question_1_b_' + housefly[o]).checked = true;
    //                     } else if (chicken[z] == 'C') {
    //                         document.getElementById('music_question_1_c_' + housefly[o]).checked = true;
    //                     } else if (chicken[z] == 'D') {
    //                         document.getElementById('music_question_1_d_' + housefly[o]).checked = true;
    //                     }


    //                     if (fowl[x] == 'A') {
    //                         document.getElementById('music_question_2_a_' + housefly[o]).checked = true;
    //                     } else if (fowl[x] == 'B') {
    //                         document.getElementById('music_question_2_b_' + housefly[o]).checked = true;
    //                     } else if (fowl[x] == 'C') {
    //                         document.getElementById('music_question_2_c_' + housefly[o]).checked = true;
    //                     } else if (fowl[x] == 'D') {
    //                         document.getElementById('music_question_2_d_' + housefly[o]).checked = true;
    //                     }

    //                     if (cow[b] == 'A') {
    //                         document.getElementById('music_question_3_a_' + housefly[o]).checked = true;
    //                     } else if (cow[b] == 'B') {
    //                         document.getElementById('music_question_3_b_' + housefly[o]).checked = true;
    //                     } else if (cow[b] == 'C') {
    //                         document.getElementById('music_question_3_c_' + housefly[o]).checked = true;
    //                     } else if (cow[b] == 'D') {
    //                         document.getElementById('music_question_3_d_' + housefly[o]).checked = true;
    //                     }

    //                     if (sheep[c] == 'A') {
    //                         document.getElementById('music_question_4_a_' + housefly[o]).checked = true;
    //                     } else if (sheep[c] == 'B') {
    //                         document.getElementById('music_question_4_b_' + housefly[o]).checked = true;
    //                     } else if (sheep[c] == 'C') {
    //                         document.getElementById('music_question_4_c_' + housefly[o]).checked = true;
    //                     } else if (sheep[c] == 'D') {
    //                         document.getElementById('music_question_4_d_' + housefly[o]).checked = true;
    //                     }

    //                     if (goat[d] == 'A') {
    //                         document.getElementById('music_question_5_a_' + housefly[o]).checked = true;
    //                     } else if (goat[d] == 'B') {
    //                         document.getElementById('music_question_5_b_' + housefly[o]).checked = true;
    //                     } else if (goat[d] == 'C') {
    //                         document.getElementById('music_question_5_c_' + housefly[o]).checked = true;
    //                     } else if (goat[d] == 'D') {
    //                         document.getElementById('music_question_5_d_' + housefly[o]).checked = true;
    //                     }
    //                 } else if (selected_nurresulsubjectinput1 == 'WRITING SKILLS') {
    //                     $(".nurresultlistlist2").append('<div class="card" id="unique_card_' + housefly[o] + '"><div class="card-body"><h5>' + fish[y] + '</h5><h6>' + housefly[o] + '</h6><br><h7>' + selected_nurresulsubjectinput1 + '</h7><br><br><table class="table"><tbody><td>QUESTIONS</td><td>GRADES</td></tbody><tbody><td>I can recognize beginning letter sounds <input type="text" class="form-control" id="writing_skills_question_1_first_input_' + housefly[o] + '" style="width:35px!important;" value="' + front9[bb] + '"> to <input type="text" class="form-control" id="writing_skills_question_1_second_input_' + housefly[o] + '" style="width:35px!important;" value="' + front10[aa] + '"></td><td><form action="POST" class="col-11"><input type="radio" id="writing_skills_question_1_a_' + housefly[o] + '" name="writing_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="writing_skills_question_1_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="writing_skills_question_1_b_' + housefly[o] + '" name="writing_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="writing_skills_question_1_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="writing_skills_question_1_c_' + housefly[o] + '" name="writing_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="writing_skills_question_1_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="writing_skills_question_1_d_' + housefly[o] + '" name="writing_skills_question_1_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="writing_skills_question_1_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I can sound and write letter sounds <input type="text" class="form-control" id="writing_skills_question_2_first_input_' + housefly[o] + '" style="width:35px!important;" value="' + front11[cc] + '"> to <input type="text" class="form-control" id="writing_skills_question_2_second_input_' + housefly[o] + '" style="width:35px!important;" value="' + front12[dd] + '"></td><td><form action="POST" class="col-11"><input type="radio" id="writing_skills_question_2_a_' + housefly[o] + '" name="writing_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="writing_skills_question_2_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="writing_skills_question_2_b_' + housefly[o] + '" name="writing_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="writing_skills_question_2_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="writing_skills_question_2_c_' + housefly[o] + '" name="writing_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="writing_skills_question_2_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="writing_skills_question_2_d_' + housefly[o] + '" name="writing_skills_question_2_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="writing_skills_question_2_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I can sound and recognise diagrams</td><td><form action="POST" class="col-11"><input type="radio" id="writing_skills_question_3_a_' + housefly[o] + '" name="writing_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="writing_skills_question_3_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="writing_skills_question_3_b_' + housefly[o] + '" name="writing_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="writing_skills_question_3_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="writing_skills_question_3_c_' + housefly[o] + '" name="writing_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="writing_skills_question_3_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="writing_skills_question_3_d_' + housefly[o] + '" name="writing_skills_question_3_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="writing_skills_question_3_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody><tbody><td>I can blend two letter words</td><td><form action="POST" class="col-11"><input type="radio" id="writing_skills_question_4_a_' + housefly[o] + '" name="writing_skills_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="A"><label for="writing_skills_question_4_a_' + housefly[o] + '">HONOUR ROLL</label><input type="radio" id="writing_skills_question_4_b_' + housefly[o] + '" name="writing_skills_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="B"><label for="writing_skills_question_4_b_' + housefly[o] + '">SUPER EFFORT</label><input type="radio" id="writing_skills_question_4_c_' + housefly[o] + '" name="writing_skills_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="C"><label for="writing_skills_question_4_c_' + housefly[o] + '">IMPROVING</label><input type="radio" id="writing_skills_question_4_d_' + housefly[o] + '" name="writing_skills_question_4_' + housefly[o] + '" class="mr-2 ml-4" value="D"><label for="writing_skills_question_4_d_' + housefly[o] + '">WORKING AT IT</label></form></td></tbody></table><br><div class="row col-12 ml-1"><input type="button" name="PREVIOUS" id="nurresultpreviousbtn" class="btn btn-outline-success col-1" value="PREVIOUS"><div class="col-10"></div><input type="button" name="NEXT" id="nurresultsavebtn" class="btn btn-outline-success col-1" value="NEXT"></div></div></div>');
    //                     let nurresultContents = document.getElementById("unique_card_1");
    //                     nurresultContents.classList.add("active");
    //                     if (chicken[z] == 'A') {
    //                         document.getElementById('writing_skills_question_1_a_' + housefly[o]).checked = true;
    //                     } else if (chicken[z] == 'B') {
    //                         document.getElementById('writing_skills_question_1_b_' + housefly[o]).checked = true;
    //                     } else if (chicken[z] == 'C') {
    //                         document.getElementById('writing_skills_question_1_c_' + housefly[o]).checked = true;
    //                     } else if (chicken[z] == 'D') {
    //                         document.getElementById('writing_skills_question_1_d_' + housefly[o]).checked = true;
    //                     }


    //                     if (fowl[x] == 'A') {
    //                         document.getElementById('writing_skills_question_2_a_' + housefly[o]).checked = true;
    //                     } else if (fowl[x] == 'B') {
    //                         document.getElementById('writing_skills_question_2_b_' + housefly[o]).checked = true;
    //                     } else if (fowl[x] == 'C') {
    //                         document.getElementById('writing_skills_question_2_c_' + housefly[o]).checked = true;
    //                     } else if (fowl[x] == 'D') {
    //                         document.getElementById('writing_skills_question_2_d_' + housefly[o]).checked = true;
    //                     }

    //                     if (cow[b] == 'A') {
    //                         document.getElementById('writing_skills_question_3_a_' + housefly[o]).checked = true;
    //                     } else if (cow[b] == 'B') {
    //                         document.getElementById('writing_skills_question_3_b_' + housefly[o]).checked = true;
    //                     } else if (cow[b] == 'C') {
    //                         document.getElementById('writing_skills_question_3_c_' + housefly[o]).checked = true;
    //                     } else if (cow[b] == 'D') {
    //                         document.getElementById('writing_skills_question_3_d_' + housefly[o]).checked = true;
    //                     }

    //                     if (sheep[c] == 'A') {
    //                         document.getElementById('writing_skills_question_4_a_' + housefly[o]).checked = true;
    //                     } else if (sheep[c] == 'B') {
    //                         document.getElementById('writing_skills_question_4_b_' + housefly[o]).checked = true;
    //                     } else if (sheep[c] == 'C') {
    //                         document.getElementById('writing_skills_question_4_c_' + housefly[o]).checked = true;
    //                     } else if (sheep[c] == 'D') {
    //                         document.getElementById('writing_skills_question_4_d_' + housefly[o]).checked = true;
    //                     }

                        
    //                 }
                    
                    
    //             }
    //             }
                
                
                
    //             let tabContents2 = document.querySelectorAll(".nurresultlistlist .studentresultcontent > div");

    //             $("#nurresultlist2").on('click', '#nurresultsavebtn', function() {

    //                 var one = $("#nurresultsessionslistdropdown").val();
    //                 var two = $("#nurresultsectionlistdropdown").val();
    //                 var three = $("#nurresultclasslistdropdown").val();
    //                 var four = $("#nurresulttermlistdropdown").val();
    //                 var five = $("#nurresultsubjectlistdropdown").val();
    //                 var six = $(".nurresultlistlist .studentresultcontent .active .card-body > h5 ").text();
    //                 var identity = $(".nurresultlistlist .studentresultcontent .active .card-body > h6 ").text();
    //                 var csrftoken = $("#nursery_result > input[name=csrfmiddlewaretoken]").val();

    //                 if (five == 'NUMERACY') {
    //                     var seven = $("input[name='numeracy_question_1_" + identity + "']:checked").val();
    //                     var eight = $("input[name='numeracy_question_2_" + identity + "']:checked").val();
    //                     var nine = $("input[name='numeracy_question_3_" + identity + "']:checked").val();
    //                     var ten = $("input[name='numeracy_question_4_" + identity + "']:checked").val();
    //                     var eleven = $("input[name='numeracy_question_5_" + identity + "']:checked").val();
    //                     var fifth = $("#numeracy_question_1_first_input_" + identity + "").val();
    //                     var sixth = $("#numeracy_question_1_second_input_" + identity + "").val();
    //                     var seventh = $("#numeracy_question_2_first_input_" + identity + "").val();
    //                     var eighth = $("#numeracy_question_2_second_input_" + identity + "").val();
    //                     var nineth = $("#numeracy_question_3_input_" + identity + "").val();
    //                     var tenth = $("#numeracy_question_4_input_" + identity + "").val();
    //                     var eleventh = $("#numeracy_question_5_first_input_" + identity + "").val();
    //                     var twelfth = $("#numeracy_question_5_second_input_" + identity + "").val();
    //                 } else if (five == 'LITERACY') {
    //                     var seven = $("input[name='literacy_question_1_" + identity + "']:checked").val();
    //                     var eight = $("input[name='literacy_question_2_" + identity + "']:checked").val();
    //                     var nine = $("input[name='literacy_question_3_" + identity + "']:checked").val();
    //                     var ten = $("input[name='literacy_question_4_" + identity + "']:checked").val();
    //                     var eleven = $("input[name='literacy_question_5_" + identity + "']:checked").val();
    //                     var twelve = $("input[name='literacy_question_6_" + identity + "']:checked").val();
    //                     var thirteen = $("input[name='literacy_question_7_" + identity + "']:checked").val();
    //                     var fourteen = $("input[name='literacy_question_8_" + identity + "']:checked").val();
    //                 } else if (five == 'ICT SKILLS (COMPUTER)') {
    //                     var seven = $("input[name='ict_skills_question_1_" + identity + "']:checked").val();
    //                     var eight = $("input[name='ict_skills_question_2_" + identity + "']:checked").val();
    //                     var nine = $("input[name='ict_skills_question_3_" + identity + "']:checked").val();
    //                 } else if (five == 'EMOTIONAL SKILLS') {
    //                     var seven = $("input[name='emotional_skills_question_1_" + identity + "']:checked").val();
    //                     var eight = $("input[name='emotional_skills_question_2_" + identity + "']:checked").val();
    //                     var nine = $("input[name='emotional_skills_question_3_" + identity + "']:checked").val();
    //                     var ten = $("input[name='emotional_skills_question_4_" + identity + "']:checked").val();
    //                 } else if (five == 'FINE MOTOR SKILLS') {
    //                     var seven = $("input[name='fine_motor_skills_question_1_" + identity + "']:checked").val();
    //                     var eight = $("input[name='fine_motor_skills_question_2_" + identity + "']:checked").val();
    //                     var nine = $("input[name='fine_motor_skills_question_3_" + identity + "']:checked").val();
    //                     var ten = $("input[name='fine_motor_skills_question_4_" + identity + "']:checked").val();
    //                     var eleven = $("input[name='fine_motor_skills_question_5_" + identity + "']:checked").val();
    //                     var twelve = $("input[name='fine_motor_skills_question_6_" + identity + "']:checked").val();
    //                     var thirteen = $("input[name='fine_motor_skills_question_7_" + identity + "']:checked").val();
    //                     var fourteen = $("input[name='fine_motor_skills_question_8_" + identity + "']:checked").val();
    //                 } else if (five == 'GROSS MOTOR SKILLS') {
    //                     var seven = $("input[name='gross_motor_skills_question_1_" + identity + "']:checked").val();
    //                     var eight = $("input[name='gross_motor_skills_question_2_" + identity + "']:checked").val();
    //                     var nine = $("input[name='gross_motor_skills_question_3_" + identity + "']:checked").val();
    //                 } else if (five == 'RHYMES AND SONGS (MUSIC)') {
    //                     var seven = $("input[name='music_question_1_" + identity + "']:checked").val();
    //                     var eight = $("input[name='music_question_2_" + identity + "']:checked").val();
    //                     var nine = $("input[name='music_question_3_" + identity + "']:checked").val();
    //                     var ten = $("input[name='music_question_4_" + identity + "']:checked").val();
    //                     var eleven = $("input[name='music_question_5_" + identity + "']:checked").val();
    //                 } else if (five == 'SOCIAL SKILLS') {
    //                     var seven = $("input[name='social_skills_question_1_" + identity + "']:checked").val();
    //                     var eight = $("input[name='social_skills_question_2_" + identity + "']:checked").val();
    //                     var nine = $("input[name='social_skills_question_3_" + identity + "']:checked").val();
    //                     var ten = $("input[name='social_skills_question_4_" + identity + "']:checked").val();
    //                     var eleven = $("input[name='social_skills_question_5_" + identity + "']:checked").val();
    //                     var twelve = $("input[name='social_skills_question_6_" + identity + "']:checked").val();
    //                     var thirteen = $("input[name='social_skills_question_7_" + identity + "']:checked").val();
    //                     var fourteen = $("input[name='social_skills_question_8_" + identity + "']:checked").val();
    //                     var fifteen = $("input[name='social_skills_question_9_" + identity + "']:checked").val();
    //                     var sixteen = $("input[name='social_skills_question_10_" + identity + "']:checked").val();
    //                     var seventeen = $("input[name='social_skills_question_11_" + identity + "']:checked").val();
    //                     var eighteen = $("input[name='social_skills_question_12_" + identity + "']:checked").val();
    //                 } else if (five == 'WRITING SKILLS') {
    //                     var seven = $("input[name='writing_skills_question_1_" + identity + "']:checked").val();
    //                     var eight = $("input[name='writing_skills_question_2_" + identity + "']:checked").val();
    //                     var nine = $("input[name='writing_skills_question_3_" + identity + "']:checked").val();
    //                     var ten = $("input[name='writing_skills_question_4_" + identity + "']:checked").val();
    //                     var first = $("#writing_skills_question_1_first_input_" + identity + "").val();
    //                     var second = $("#writing_skills_question_1_second_input_" + identity + "").val();
    //                     var third = $("#writing_skills_question_2_first_input_" + identity + "").val();
    //                     var fourth = $("#writing_skills_question_2_second_input_" + identity + "").val();
    //                 }
                    

    //                 console.log(one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, first, second, third, fourth, fifth, sixth, seventh, eighth, nineth, tenth, eleventh, twelfth, identity)

    //                 $.ajax({
    //                     type: "POST",
    //                     url: `result/update/${identity}/`,
    //                     data: {
    //                         csrfmiddlewaretoken:csrftoken,
    //                         session_name:one,
    //                         section_name:two,
    //                         class_name:three,
    //                         term_name:four,
    //                         subject_name:five,
    //                         student_full_name:six,
    //                         question1: seven,
    //                         question2: eight,
    //                         question3: nine,
    //                         question4: ten,
    //                         question5: eleven,
    //                         question6: twelve,
    //                         question7: thirteen,
    //                         question8: fourteen,
    //                         question9: fifteen,
    //                         question10: sixteen,
    //                         question11: seventeen,
    //                         question12: eighteen,
    //                         numeracy1: fifth,
    //                         numeracy2: sixth,
    //                         numeracy3: seventh,
    //                         numeracy4: eighth,
    //                         numeracy5: nineth,
    //                         numeracy6: tenth,
    //                         numeracy7: eleventh,
    //                         numeracy8: twelfth,
    //                         writing1: first,
    //                         writing2: second,
    //                         writing3: third,
    //                         writing4: fourth,
    //                     },
            
    //                     success: function(response) {
    //                         document.querySelector(".tabs .tab-content .active").scrollTo(0, 250);
    //                         for(let i=0;i<tabContents2.length;i++){
    //                         document.querySelector(".nurresultlistlist .studentresultcontent > .active").classList.remove("active");
    //                         tabContents2[i].classList.add("active");
    //                         }
    //                     }
    //                 });
 
                    
    //             });

    //             $("#nurresultlist2").on('click', '#nurresultpreviousbtn', function() {

    //                 var one = $("#nurresultsessionslistdropdown").val();
    //                 var two = $("#nurresultsectionlistdropdown").val();
    //                 var three = $("#nurresultclasslistdropdown").val();
    //                 var four = $("#nurresulttermlistdropdown").val();
    //                 var five = $("#nurresultsubjectlistdropdown").val();
    //                 var six = $(".nurresultlistlist .studentresultcontent .active .card-body > h5 ").text();
    //                 var identity = $(".nurresultlistlist .studentresultcontent .active .card-body > h6 ").text();
    //                 var csrftoken = $("#nursery_result > input[name=csrfmiddlewaretoken]").val();

    //                 if (five == 'NUMERACY') {
    //                     var seven = $("input[name='numeracy_question_1_" + identity + "']:checked").val();
    //                     var eight = $("input[name='numeracy_question_2_" + identity + "']:checked").val();
    //                     var nine = $("input[name='numeracy_question_3_" + identity + "']:checked").val();
    //                     var ten = $("input[name='numeracy_question_4_" + identity + "']:checked").val();
    //                     var eleven = $("input[name='numeracy_question_5_" + identity + "']:checked").val();
    //                     var fifth = $("#numeracy_question_1_first_input_" + identity + "").val();
    //                     var sixth = $("#numeracy_question_1_second_input_" + identity + "").val();
    //                     var seventh = $("#numeracy_question_2_first_input_" + identity + "").val();
    //                     var eighth = $("#numeracy_question_2_second_input_" + identity + "").val();
    //                     var nineth = $("#numeracy_question_3_input_" + identity + "").val();
    //                     var tenth = $("#numeracy_question_4_input_" + identity + "").val();
    //                     var eleventh = $("#numeracy_question_5_first_input_" + identity + "").val();
    //                     var twelfth = $("#numeracy_question_5_second_input_" + identity + "").val();
    //                 } else if (five == 'LITERACY') {
    //                     var seven = $("input[name='literacy_question_1_" + identity + "']:checked").val();
    //                     var eight = $("input[name='literacy_question_2_" + identity + "']:checked").val();
    //                     var nine = $("input[name='literacy_question_3_" + identity + "']:checked").val();
    //                     var ten = $("input[name='literacy_question_4_" + identity + "']:checked").val();
    //                     var eleven = $("input[name='literacy_question_5_" + identity + "']:checked").val();
    //                     var twelve = $("input[name='literacy_question_6_" + identity + "']:checked").val();
    //                     var thirteen = $("input[name='literacy_question_7_" + identity + "']:checked").val();
    //                     var fourteen = $("input[name='literacy_question_8_" + identity + "']:checked").val();
    //                 } else if (five == 'ICT SKILLS (COMPUTER)') {
    //                     var seven = $("input[name='ict_skills_question_1_" + identity + "']:checked").val();
    //                     var eight = $("input[name='ict_skills_question_2_" + identity + "']:checked").val();
    //                     var nine = $("input[name='ict_skills_question_3_" + identity + "']:checked").val();
    //                 } else if (five == 'EMOTIONAL SKILLS') {
    //                     var seven = $("input[name='emotional_skills_question_1_" + identity + "']:checked").val();
    //                     var eight = $("input[name='emotional_skills_question_2_" + identity + "']:checked").val();
    //                     var nine = $("input[name='emotional_skills_question_3_" + identity + "']:checked").val();
    //                     var ten = $("input[name='emotional_skills_question_4_" + identity + "']:checked").val();
    //                 } else if (five == 'FINE MOTOR SKILLS') {
    //                     var seven = $("input[name='fine_motor_skills_question_1_" + identity + "']:checked").val();
    //                     var eight = $("input[name='fine_motor_skills_question_2_" + identity + "']:checked").val();
    //                     var nine = $("input[name='fine_motor_skills_question_3_" + identity + "']:checked").val();
    //                     var ten = $("input[name='fine_motor_skills_question_4_" + identity + "']:checked").val();
    //                     var eleven = $("input[name='fine_motor_skills_question_5_" + identity + "']:checked").val();
    //                     var twelve = $("input[name='fine_motor_skills_question_6_" + identity + "']:checked").val();
    //                     var thirteen = $("input[name='fine_motor_skills_question_7_" + identity + "']:checked").val();
    //                     var fourteen = $("input[name='fine_motor_skills_question_8_" + identity + "']:checked").val();
    //                 } else if (five == 'GROSS MOTOR SKILLS') {
    //                     var seven = $("input[name='gross_motor_skills_question_1_" + identity + "']:checked").val();
    //                     var eight = $("input[name='gross_motor_skills_question_2_" + identity + "']:checked").val();
    //                     var nine = $("input[name='gross_motor_skills_question_3_" + identity + "']:checked").val();
    //                 } else if (five == 'RHYMES AND SONGS (MUSIC)') {
    //                     var seven = $("input[name='music_question_1_" + identity + "']:checked").val();
    //                     var eight = $("input[name='music_question_2_" + identity + "']:checked").val();
    //                     var nine = $("input[name='music_question_3_" + identity + "']:checked").val();
    //                     var ten = $("input[name='music_question_4_" + identity + "']:checked").val();
    //                     var eleven = $("input[name='music_question_5_" + identity + "']:checked").val();
    //                 } else if (five == 'SOCIAL SKILLS') {
    //                     var seven = $("input[name='social_skills_question_1_" + identity + "']:checked").val();
    //                     var eight = $("input[name='social_skills_question_2_" + identity + "']:checked").val();
    //                     var nine = $("input[name='social_skills_question_3_" + identity + "']:checked").val();
    //                     var ten = $("input[name='social_skills_question_4_" + identity + "']:checked").val();
    //                     var eleven = $("input[name='social_skills_question_5_" + identity + "']:checked").val();
    //                     var twelve = $("input[name='social_skills_question_6_" + identity + "']:checked").val();
    //                     var thirteen = $("input[name='social_skills_question_7_" + identity + "']:checked").val();
    //                     var fourteen = $("input[name='social_skills_question_8_" + identity + "']:checked").val();
    //                     var fifteen = $("input[name='social_skills_question_9_" + identity + "']:checked").val();
    //                     var sixteen = $("input[name='social_skills_question_10_" + identity + "']:checked").val();
    //                     var seventeen = $("input[name='social_skills_question_11_" + identity + "']:checked").val();
    //                     var eighteen = $("input[name='social_skills_question_12_" + identity + "']:checked").val();
    //                 } else if (five == 'WRITING SKILLS') {
    //                     var seven = $("input[name='writing_skills_question_1_" + identity + "']:checked").val();
    //                     var eight = $("input[name='writing_skills_question_2_" + identity + "']:checked").val();
    //                     var nine = $("input[name='writing_skills_question_3_" + identity + "']:checked").val();
    //                     var ten = $("input[name='writing_skills_question_4_" + identity + "']:checked").val();
    //                     var first = $("#writing_skills_question_1_first_input_" + identity + "").val();
    //                     var second = $("#writing_skills_question_1_second_input_" + identity + "").val();
    //                     var third = $("#writing_skills_question_2_first_input_" + identity + "").val();
    //                     var fourth = $("#writing_skills_question_2_second_input_" + identity + "").val();
    //                 }
                    

    //                 console.log(one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, first, second, third, fourth, fifth, sixth, seventh, eighth, nineth, tenth, eleventh, twelfth, identity, csrftoken)

    //                 $.ajax({
    //                     type: "POST",
    //                     url: `result/update/${identity}/`,
    //                     data: {
    //                         csrfmiddlewaretoken:csrftoken,
    //                         session_name:one,
    //                         section_name:two,
    //                         class_name:three,
    //                         term_name:four,
    //                         subject_name:five,
    //                         student_full_name:six,
    //                         question1: seven,
    //                         question2: eight,
    //                         question3: nine,
    //                         question4: ten,
    //                         question5: eleven,
    //                         question6: twelve,
    //                         question7: thirteen,
    //                         question8: fourteen,
    //                         question9: fifteen,
    //                         question10: sixteen,
    //                         question11: seventeen,
    //                         question12: eighteen,
    //                         numeracy1: fifth,
    //                         numeracy2: sixth,
    //                         numeracy3: seventh,
    //                         numeracy4: eighth,
    //                         numeracy5: nineth,
    //                         numeracy6: tenth,
    //                         numeracy7: eleventh,
    //                         numeracy8: twelfth,
    //                         writing1: first,
    //                         writing2: second,
    //                         writing3: third,
    //                         writing4: fourth,
    //                     },
            
    //                     success: function(response) {
    //                         document.querySelector(".tabs .tab-content .active").scrollTo(0, 250);
    //                         for(i = tabContents2.length - 1;i >= 0; i--){
    //                         document.querySelector(".nurresultlistlist .studentresultcontent > .active").classList.remove("active");
    //                         tabContents2[i].classList.add("active");
    //                         }
    //                     }
    //                 });
  
                    
    //             });

                
                
                
    //         },
    //         error: function(error){
    //             console.log(error)
    //         }
    //      });
    // })

    
    
    
});