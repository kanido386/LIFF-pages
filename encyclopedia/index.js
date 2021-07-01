
const problem = document.getElementById('what');
const search = document.querySelector('button');
const type_of_ache = document.getElementsByName('type-of-ache');

// 自己定義
let symptoms = [{colic : "絞痛", flatulence: "脹氣", painful: "很痛"},
                {dontknow: "不知道"},
                {superficial: "表面痛", inside: "裡面痛", temple: "太陽穴痛"},];

div_added = false;
div_added_id = null;
selected = ' ';

// search eventlistner
search.addEventListener('click', result);

// tree eventlistner
type_of_ache.forEach((elem) => {
    elem.addEventListener('change', function(event){

        if (div_added){
            const remove_div = document.getElementById(div_added_id);
            remove_div.parentNode.removeChild(remove_div);
            selected = ' ';
        }

        if(event.target.checked === true){     
            selected += event.target.dataset.ch_name;   
            add_checkbox(parseInt(event.target.value, 10));
        }

        
    });
});

// directly search
function result(){

    if(typeof problem.value !== null) {
        window.location.replace("https://dzs.deepq.com/search?query=" + problem.value);
    }else{
        console.log("no input");
    }
}

// if previous state got checked, add child checkboxes
function add_checkbox(index){

    const div = document.createElement('div');
    div.className = "flex-container symptom_checkboxes" ;
    div.id = "state" + index; 

    let value_index = 0;
    for (symptom in symptoms[index]){
                
        const checkbox = document.createElement('input');
        checkbox.type = 'radio';
        checkbox.name = 'type_of_ache_state2';
        checkbox.id = symptom;
        checkbox.value = value_index;
        checkbox.dataset.ch_name = symptoms[index][symptom];

        div.appendChild(checkbox);

        checkbox.addEventListener('change', function(event){

            selected += ' ' + event.target.dataset.ch_name;
            console.log(selected)
            window.location.href = 'https://dzs.deepq.com/search?query=' + selected;
            
        });

        const label = document.createElement('label');
        label.className = 'flex-item';
        label.htmlFor = symptom ;
        label.append(symptoms[index][symptom])

        div.appendChild(label);    

        value_index += 1;
    }

    div_added_id = div.id;
    div_added = true;
    document.getElementsByTagName('body')[0].appendChild(div);
}


function search_by_tree(){

}

function initializeLiff(myLiffId) {
  liff.init({
    liffId: myLiffId
  })
  .then(() => {
    // start to use LIFF's api
    initializeApp();
  })
  .catch((err) => {
  });
}

initializeLiff('1656147392-N9OGxeGa');