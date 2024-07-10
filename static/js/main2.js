

var csrftoken = $("#nursery_result > input[name=csrfmiddlewaretoken]").val();

$.ajax({
    type:'GET',
    url: 'class/session/',
    success: function(response){
        const sessiondropdown = document.getElementById('promsessionslistdropdown')
        const sessiondropdown2 = document.getElementById('promsessionslistdropdown2')
        
        const sessionsdropdown = response.class_sessions_val
        sessionsdropdown.map(item=>{
            const option = document.createElement('option')
            const option2 = document.createElement('option')
            
            option.textContent = item.session_name
            option.setAttribute('value', item.session_name)
            option.setAttribute('id', item.id)

            option2.textContent = item.session_name
            option2.setAttribute('value', item.session_name)
            option2.setAttribute('id', item.id)

            

            sessiondropdown.appendChild(option);
            sessiondropdown2.appendChild(option2);
           
        })
    },
    error: function(error){
        console.log(error)
    }
});



const resultsessioninput1 = document.getElementById('promsessionslistdropdown');
const resultsectiondropdown = document.getElementById('promsectionslistdropdown');

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
                        resultsectiondropdown.appendChild(option2)
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



            const resultsessioninput2 = document.getElementById('promsessionslistdropdown2');
const resultsectiondropdown2 = document.getElementById('promsectionslistdropdown2');

            resultsessioninput2.addEventListener('change', e=>{
                console.log(e.target.value)
                const selected_resultsessioninput1 = e.target.value
        
                resultsectiondropdown2.innerHTML = ""

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
                        resultsectiondropdown2.appendChild(option2)
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
                            resultsectiondropdown2.appendChild(option)
                            resultsectiondropdown2.appendChild(option2)
                        })
                
                    },
                    error: function(error){
                        console.log(error)
                    }
                });
            })


            const resultsectioninput1 = document.getElementById('promsectionslistdropdown');
            const resultclassdropdown = document.getElementById('promclasslistdropdown');

            resultsectioninput1.addEventListener('change', e=>{
                console.log(e.target.value)
                const selected_resultsectioninput1 = e.target.value
                const val = $('#promsessionslistdropdown').val();
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
                        resultclassdropdown.appendChild(option2)
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


            const resultsectioninput2 = document.getElementById('promsectionslistdropdown2');
            const resultclassdropdown2 = document.getElementById('promclasslistdropdown2');

            resultsectioninput2.addEventListener('change', e=>{
                console.log(e.target.value)
                const selected_resultsectioninput1 = e.target.value
                const val = $('#promsessionslistdropdown2').val();
                console.log(val)
        
                resultclassdropdown2.innerHTML = ""

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
                        resultclassdropdown2.appendChild(option2)
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
                            resultclassdropdown2.appendChild(option)
                            resultclassdropdown2.appendChild(option2)
                        })
                
                    },
                    error: function(error){
                        console.log(error)
                    }
                });
            })



            const resultclassinput1 = document.getElementById('promclasslistdropdown');
            const resulttermdropdown = document.getElementById('promtermlistdropdown');

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


            const resultclassinput2 = document.getElementById('promclasslistdropdown2');
            const resulttermdropdown2 = document.getElementById('promtermlistdropdown2');

            resultclassinput2.addEventListener('change', e=>{
                console.log(e.target.value)
            
                resulttermdropdown2.innerHTML = ""

                const option2 = document.createElement('option')
                option2.textContent = "Choose a Term"
                option2.setAttribute('hidden', true)
                option2.setAttribute('selected', true)
                option2.setAttribute('disabled', true)
                resulttermdropdown2.appendChild(option2)

                const option = document.createElement('option')
                option.textContent = 'FIRST TERM'
                option.setAttribute('value', 'FIRST TERM')
                option.setAttribute('id', '')
                resulttermdropdown2.appendChild(option)

                const option3 = document.createElement('option')
                option3.textContent = 'SECOND TERM'
                option3.setAttribute('value', 'SECOND TERM')
                option3.setAttribute('id', '')
                resulttermdropdown2.appendChild(option3)

                const option4 = document.createElement('option')
                option4.textContent = 'THIRD TERM'
                option4.setAttribute('value', 'THIRD TERM')
                option4.setAttribute('id', '')
                resulttermdropdown2.appendChild(option4)
            })





let subjectcreatebtn = document.getElementById('promotebtn')
let subjectlist = document.querySelectorAll(".tabs .tab-content .subjectallocation .subjectdisplay .subjectdisplay2 > div");

// for(let i=0;i<subjectlist.length;i++){
    subjectcreatebtn.addEventListener("click", function(){
        var favourite = [];
        $.each($("input[name='prevcheckbox']:checked"), function() {
            favourite.push($(this).attr('id'));
        });
        // alert("subjects are" + favourite);
        console.log(favourite);
        for(let i=0;i<favourite.length;i++){
            console.log(favourite[i])
            var session_name = $('#promsessionslistdropdown2').val();
            var section_name = $('#promsectionslistdropdown2').val();
            var class_name = $('#promclasslistdropdown2').val();
            var term_name = $('#promtermlistdropdown2').val();
            var oldsession_name = $('#promsessionslistdropdown').val();
            var oldsection_name = $('#promsectionslistdropdown').val();
            var oldclass_name = $('#promclasslistdropdown').val();
            var oldterm_name = $('#promtermlistdropdown').val();
            var csrftoken4 = $(".subjectdisplay > input[name=csrfmiddlewaretoken]").val();
            console.log(session_name, section_name, class_name, term_name, csrftoken4)

            $.ajax({
                type:'POST',
                url: `promote/student/${favourite[i]}/`,
                data: {
                    oldsession_name: oldsession_name,
                    oldsection_name: oldsection_name,
                    oldclass_name: oldclass_name,
                    oldterm_name: oldterm_name,
                    session_name: session_name,
                    section_name: section_name,
                    class_name: class_name,
                    term_name: term_name,
                    csrfmiddlewaretoken: csrftoken4,
                },
                success: function(response){
                    console.log(response)
                    $("#presentstudent").append('<input type="checkbox" value="' + response.full_name + '" id="present' + response.identity + '" data-id="' + response.full_name + '" name="presentcheckbox" style="margin-right:7px;"><label for="present' + response.identity + '" id="present2' + response.identity + '">' + response.full_name + '</label><br id="present3' + response.identity + '">')
                    //document.getElementById('subjectlistitem_' + favourite[i] + '').checked = false;
                    
                },   
                error: function(error){
                    alert('subject not created')
                }
            });    
        }       
    });
// }



let subjectdeletebtn = document.getElementById('demotebtn')
let termsubjectlist2 = document.querySelectorAll(".tabs .tab-content .subjectallocation .subjectdisplay .subjectdisplay3 .termsubjectdisplay");

for(let i=0;i<termsubjectlist2.length;i++){
    subjectdeletebtn.addEventListener("click", function(){
        var favourite2 = [];
        $.each($("input[name='presentcheckbox']:checked"), function() {
            favourite2.push($(this).attr('id'));
        });
        console.log(favourite2[0]);
        for(let i=0;i<favourite2.length;i++){
            var csrftoken4 = $(".subjectdisplay > input[name=csrfmiddlewaretoken]").val();
            var session_name = $('#promsessionslistdropdown2').val();
            var section_name = $('#promsectionslistdropdown2').val();
            var class_name = $('#promclasslistdropdown2').val();
            var term_name = $('#promtermlistdropdown2').val();
            
                    $.ajax({
                        type:'POST',
                        url: `demote/student/${favourite2[i]}/`,
                        data: {
                            csrfmiddlewaretoken: csrftoken4,
                            session_name: session_name,
                            section_name: section_name,
                            class_name: class_name,
                            term_name: term_name,
                        },
                        success: function(response){
                            console.log(response.admission_no0)
                            document.getElementById('present' + response.admission_no0).remove();
                            document.getElementById('present2' + response.admission_no0).remove();
                            document.getElementById('present3' + response.admission_no0).remove();
                            //$('#present' + response.admission_no0).remove();
                            //$('#present' + response.admission_no0).remove();
                            //$('#present' + response.admission_no0).remove();

                            
                            
                        },   
                        error: function(error){
                            alert('subject not deleted')
                        }
                    });
               

            
        }
    });   
}





const selectsectionsubjects = document.getElementById('promtermlistdropdown');
const subjectslist = document.getElementById('prevstudent');

    selectsectionsubjects.addEventListener('change', e=>{
        console.log(e.target.value)
        const selected_selectsectionsubjects = e.target.value
        var one = $('#promsessionslistdropdown').val();
        var two = $('#promsectionslistdropdown').val();
        var three = $('#promclasslistdropdown').val();
        
        subjectslist.innerHTML = ""

        $.ajax({
            type:'POST',
            url: 'student/result/get2/',
            data: {
                csrfmiddlewaretoken:csrftoken,
                session_name:one,
                section_name:two,
                class_name:three,
                term_name:selected_selectsectionsubjects,
            },
            success: function(response){
                console.log(response.stud_name)
                const data = response.stud_name
                data.map(item=>{
                    const checkbox = document.createElement('input')
                    const br = document.createElement('br')
                    const label = document.createElement('label')
                    label.textContent = item.full_name
                    checkbox.setAttribute('type', 'checkbox')
                    checkbox.setAttribute('id',  item.admission_no)
                    checkbox.style.marginRight = '7px';
                    checkbox.setAttribute('value', item.full_name)
                    checkbox.setAttribute('name', 'prevcheckbox')
                    label.setAttribute('for', item.admission_no)
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


    const selectsectionsubjects2 = document.getElementById('promtermlistdropdown2');
const subjectslist2 = document.getElementById('presentstudent');

    selectsectionsubjects2.addEventListener('change', e=>{
        console.log(e.target.value)
        const selected_selectsectionsubjects = e.target.value
        var one = $('#promsessionslistdropdown2').val();
        var two = $('#promsectionslistdropdown2').val();
        var three = $('#promclasslistdropdown2').val();
        
        subjectslist2.innerHTML = ""

        $.ajax({
            type:'POST',
            url: 'student/result/get2/',
            data: {
                csrfmiddlewaretoken:csrftoken,
                session_name:one,
                section_name:two,
                class_name:three,
                term_name:selected_selectsectionsubjects,
            },
            success: function(response){
                console.log(response.stud_name)
                const data = response.stud_name
                data.map(item=>{
                    const checkbox = document.createElement('input')
                    const br = document.createElement('br')
                    const label = document.createElement('label')
                    label.textContent = item.full_name
                    checkbox.setAttribute('type', 'checkbox')
                    checkbox.setAttribute('id', 'present' + item.admission_no)
                    checkbox.style.marginRight = '7px';
                    checkbox.setAttribute('value', item.full_name)
                    checkbox.setAttribute('name', 'presentcheckbox')
                    label.setAttribute('for', 'present' + item.admission_no)
                    label.setAttribute('id', 'present2' + item.admission_no)
                    br.setAttribute('id', 'present3' + item.admission_no)
                    subjectslist2.appendChild(checkbox)
                    subjectslist2.appendChild(label)
                    subjectslist2.appendChild(br)
                    
                })
                
            },
            error: function(error){
                console.log(error)
            }
         });
         
    })