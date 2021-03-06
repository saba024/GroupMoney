async function auth(){
    let current_user = JSON.parse(localStorage.getItem("current_user"))
    let nav = document.getElementById("authorisation")
    let user_dashboard = document.getElementById("user_dashboard")
    let budget_dashboard = document.getElementById("budget_dashboard")
    let budget_income_field = document.getElementById("budget_income")
    let budget_expenses_field = document.getElementById("budget_expenses")
    let budget_expenses_count = document.getElementById("expenses_count")
    let current_group_id = JSON.parse(localStorage.getItem("group_id"))
    let groups = []
    let uploads = []
    groups = JSON.parse(localStorage.getItem("groups"))
    uploads = JSON.parse(localStorage.getItem("uploads"))
    let expenses = []
    let groups_count = groups.length
    let group_id = parseInt(current_group_id)
    expenses = uploads[group_id].expenses
    let members_count = groups[group_id].members.length
    let expenses_count = expenses.length

    if(current_user === "none"){
        let a = document.createElement("a")
        a.textContent = "Sign In"
        a.href = "login.html"
        a.className = "nav__link"
        nav.appendChild(a)
    }else {
        budget_income_field.textContent = groups_count
        budget_expenses_field.textContent = members_count
        budget_expenses_count.textContent = expenses_count
        let username = current_user
        user_dashboard.textContent = username
        let a = document.createElement("a")
        a.textContent = username
        a.className = "nav__link"
        nav.appendChild(a)
        a = document.createElement("a")
        a.textContent = "Log out"
        a.href = "index.html"
        a.className = "nav__link"
        a.onclick = logout
        nav.appendChild(a)
    }
}

function logout(){
    localStorage.setItem("current_user", JSON.stringify("none"));
}

function loadMembers(){
    let current_group_id = JSON.parse(localStorage.getItem("group_id"))
    let group_id = parseInt(current_group_id)
    let groups = JSON.parse(localStorage.getItem("groups"))
    let members = groups[group_id].members

    ul = document.getElementById("member-list")

    let i = 0

    for (let member of members) {
        li = document.createElement("li")
        li.className = "view_item"
        div_left = document.createElement("div")
        div_left.className = "vi_left"
        div_right = document.createElement("div")
        div_right.className = "vi_right"
        let img_person = document.createElement("img")
        img_person.setAttribute("src", "./img/person.png")

        let p_title = document.createElement("p")
        p_title.className = 'title'
        p_title.textContent = member

        p_amount = document.createElement("p")

        if (groups[group_id].netAmt[i] < 0){
            p_amount.className = "neg_amount"
        }

        else{
            p_amount.className = "amount"
        }

        p_amount.textContent = groups[group_id].netAmt[i].toFixed(2).toString() + '$'
        //p_amount.textContent = (p_amount.textContent).substring(0, 4)

        button_delete = document.createElement("button")
        button_delete.className = "btn_delete"
        button_delete.textContent = "Delete"
        button_delete.setAttribute("id", member.id + "delete_member")
        button_delete.setAttribute("onClick", "delete_member(this.id)")

        div_left.appendChild(img_person)
        div_right.appendChild(p_title)
        div_right.appendChild(p_amount)
        div_right.appendChild(button_delete)

        li.appendChild(div_left)
        li.appendChild(div_right)
        ul.appendChild(li)
        i++
    }

}

function loadexpenses(){

    let current_group_id = JSON.parse(localStorage.getItem("group_id"))
    let group_id = parseInt(current_group_id)
    let uploads = []
    uploads = JSON.parse(localStorage.getItem("uploads"))
    let groups = JSON.parse(localStorage.getItem("groups"))
    let expenses = []
    expenses = uploads[group_id].expenses
    console.log("uploads", uploads)

    let ul = document.getElementById("expense_list")
    let ul_activity = document.getElementById("activity")

    if (expenses.length > 0){
        for (let expense of expenses) {
            let li = document.createElement("li")
            li.className = "view_item"
            let li1 = document.createElement("li")
            li1.className = li.className
            let div_left = document.createElement("div")
            div_left.className = "vi_left"
            let div_left1 = document.createElement("div")
            div_left1.className = div_left.className
            let div_right = document.createElement("div")
            div_right.className = "vi_right"
            let div_right1 = document.createElement("div")
            div_right1.className = div_right.className
            let img_category = document.createElement("img")
            
            if (expense.category == "Food"){
                img_category.src = "./img/food.jpg"
            }

            else{
                img_category.src = "./img/house.jpg"    
            }

            let p = document.createElement("p")
            p.textContent = expense.concept
            let div_expense = document.createElement("div")
            div_expense.className = "expense_amount"
            div_expense.textContent = expense.amount.toString() + '$'
            let img_receipt = document.createElement("input")
            img_receipt.className = "img"
            img_receipt.className = "img"
            img_receipt.setAttribute("type", "image")
            //img_receipt.setAttribute("role", "button")
            if(expense.receipt === null){
               img_receipt.src = "./img/receipt.jpg"
            }
            else{
                img_receipt.src = expense.receipt
            }
            img_receipt.src = "./img/receipt.jpg"
            let content_text = document.createElement("p")
            content_text.className = "content"
            //if(expense.users.toString()){
             //   let temp = expense.users.toString()
              //  content_text.textContent = expense.who_paid + "------>" + temp
            //}

            //else {
               content_text.textContent = expense.who_paid
           //}
            
            

            let button_delete = document.createElement("button")
            button_delete.className = "btn_delete"
            button_delete.textContent = "Delete"
            button_delete.setAttribute("id", expense.id)
            button_delete.setAttribute("onClick", "delete_expense(this.id)")

            let img_pers = document.createElement("img")
            img_pers.src = "./img/person.png"
            let p_activity = document.createElement("p")
            p_activity.className = "title"
            p_activity.textContent = expense.who_paid + " added expense for " + expense.concept + '($' + expense.amount + ')'
            let p_activity_date = document.createElement("p")
            p_activity_date.className = "content"
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0');
            let yyyy = today.getFullYear();
            today = mm + '/' + dd + '/' + yyyy;
            p_activity_date.textContent = today

            div_left.appendChild(img_category)
            div_right.appendChild(p)
            div_right.appendChild(div_expense)
            div_right.appendChild(img_receipt)
            div_right.appendChild(content_text)
            //div_right.appendChild(button_edit)
            div_right.appendChild(button_delete)

            div_left1.appendChild(img_pers)
            div_right1.appendChild(p_activity)
            div_right1.appendChild(p_activity_date)

            li.appendChild(div_left)
            li.appendChild(div_right)

            li1.appendChild(div_left1)
            li1.appendChild(div_right1)

            ul.appendChild(li)
            ul_activity.appendChild(li1)

        }
    }   
}

function loadDebts(){
    ul = document.getElementById("debt-list")
    let debts = []

    let new_debt = new Debt(0, "wav", "rex", 100)
    debts.push(new_debt)


    if (debts.length > 0){

        for (let debt of debts) {
            li = document.createElement("li")
            li.className = "view_item"
            div_left = document.createElement("div")
            div_left.className = "vi_left"
            div_right = document.createElement("div")
            div_right.className = "vi_right"
            let img_person = document.createElement("img")
            
            img_person.src = "./img/person.png"

            let p_title = document.createElement("p")
            p_title.className = 'title'
            p_title.textContent = debt.name + '---->' + debt.nameto

            let p_amount = document.createElement("p")
            p_amount.className = "debt_content"
            p_amount.textContent = debt.amount.toString() + '$'

            let button_settle_up = document.createElement("button")
            button_settle_up.className = "btn_edit"
            button_settle_up.textContent = "Setle Up"
            button_settle_up.setAttribute("id", debt.id + "_debt")
            button_settle_up.setAttribute("onClick", "setle_debt(this.id)")


            div_left.appendChild(img_person)
            div_right.appendChild(p_title)
            div_right.appendChild(p_amount)
            div_right.appendChild(button_settle_up)

            li.appendChild(div_left)
            li.appendChild(div_right)

            ul.appendChild(li)

        }
    }
}

auth()
loadMembers()
loadexpenses()
loadDebts()




//---------------------------------------------

function loadData(){
	localStorage.setItem("current_id", JSON.stringify(-1))
	
    /*let expenses = []
    expenses = JSON.parse(localStorage.getItem("expenses"))

    let debts = []
    debts = JSON.parse(localStorage.getItem("debts"))

    let members = []
    members = JSON.parse(localStorage.getItem("members"))*/

    let current_group_id = JSON.parse(localStorage.getItem("current_group_id"))

    let groups = []
    groups = JSON.parse(localStorage.getItem("group"))

    console.log("current_group_id", current_group_id)

    let group_id = parseInt(current_group_id)

    console.log("group_id", group_id)


    //if (groups === null){
    //	groups = template_expenses()
        //group_id = 0
    //}

    /*if (debts == null)
    {
        debts = template_debts()
    }

    if (members == null)
    {
        members = template_members()
    }

    localStorage.setItem("expenses", JSON.stringify(expenses));
    console.log("expenses", expenses)

    localStorage.setItem("debts", JSON.stringify(debts));
    console.log("debts", debts)*/

    localStorage.setItem("group", JSON.stringify(groups));
    console.log("group", groups)

    let current_group = groups[group_id]

    console.log("current_group", current_group)    

    let expenses = current_group.expenses
    let debts = current_group.debts
    let members = current_group.members

    console.log("expenses", expenses)
    console.log("debts", debts)
    console.log("members", members)

    let ul = document.getElementById("expense_list")
    let ul_activity = document.getElementById("activity")

    if (expenses.length > 0){
        for (let expense of expenses) {
        	let li = document.createElement("li")
        	li.className = "view_item"
            let li1 = document.createElement("li")
            li1.className = li.className
        	let div_left = document.createElement("div")
        	div_left.className = "vi_left"
            let div_left1 = document.createElement("div")
            div_left1.className = div_left.className
        	let div_right = document.createElement("div")
        	div_right.className = "vi_right"
            let div_right1 = document.createElement("div")
            div_right1.className = div_right.className
        	let img_category = document.createElement("img")
        	
        	if (expense.category == "Food"){
        		img_category.src = "./img/food.jpg"
        	}

        	else{
        		img_category.src = "./img/house.jpg"	
        	}

        	let p = document.createElement("p")
        	p.textContent = expense.concept
        	let div_expense = document.createElement("div")
        	div_expense.className = "expense_amount"
        	div_expense.textContent = expense.amount.toString() + '$'
        	let img_receipt = document.createElement("input")
            //img_receipt.className = "img"
            img_receipt.className = "img"
            img_receipt.setAttribute("type", "image")
            img_receipt.setAttribute("role", "button")
            //if(expense.receipt === null){
        	 //  img_receipt.src = "./img/receipt.jpg"
            //}
            //else{
              // img_receipt.src = expense.receipt
            //}
            //img_receipt.src = "./img/food.jpg"
        	let content_text = document.createElement("p")
        	content_text.className = "content"
        	let temp = expense.users.toString()
        	content_text.textContent = expense.who_paid + "------>" + temp
        	let button_edit = document.createElement("button")
        	button_edit.className = "btn_edit"
            button_edit.textContent = "Edit"
            button_edit.setAttribute("id", expense.id + "_edit")
            button_edit.setAttribute("onClick", "edit_expense(this.id)")

        	let button_delete = document.createElement("button")
        	button_delete.className = "btn_delete"
            button_delete.textContent = "Delete"
            button_delete.setAttribute("id", expense.id)
            button_delete.setAttribute("onClick", "delete_expense(this.id)")

            let img_pers = document.createElement("img")
            img_pers.src = "./img/person.png"
            let p_activity = document.createElement("p")
            p_activity.className = "title"
            p_activity.textContent = expense.who_paid + " added expense for " + expense.concept + '($' + expense.amount + ')'
            let p_activity_date = document.createElement("p")
            p_activity_date.className = "content"
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0');
            let yyyy = today.getFullYear();
            today = mm + '/' + dd + '/' + yyyy;
            p_activity_date.textContent = today

    	    div_left.appendChild(img_category)
    	    div_right.appendChild(p)
    	    div_right.appendChild(div_expense)
    	    div_right.appendChild(img_receipt)
    	    div_right.appendChild(content_text)
            div_right.appendChild(button_edit)
            div_right.appendChild(button_delete)

            div_left1.appendChild(img_pers)
            div_right1.appendChild(p_activity)
            div_right1.appendChild(p_activity_date)

    	    li.appendChild(div_left)
    	    li.appendChild(div_right)

            li1.appendChild(div_left1)
            li1.appendChild(div_right1)

    	    ul.appendChild(li)
            ul_activity.appendChild(li1)

        }
    }

    ul = document.getElementById("debt-list")

    if (debts.length > 0){

        for (let debt of debts) {
            li = document.createElement("li")
            li.className = "view_item"
            div_left = document.createElement("div")
            div_left.className = "vi_left"
            div_right = document.createElement("div")
            div_right.className = "vi_right"
            let img_person = document.createElement("img")
            
            img_person.src = "./img/person.png"

            let p_title = document.createElement("p")
            p_title.className = 'title'
            p_title.textContent = debt.name + '---->' + debt.nameto

            let p_amount = document.createElement("p")
            p_amount.className = "debt_content"
            p_amount.textContent = debt.amount.toString() + '$'

            let button_settle_up = document.createElement("button")
            button_settle_up.className = "btn_edit"
            button_settle_up.textContent = "Setle Up"
            button_settle_up.setAttribute("id", debt.id + "_debt")
            button_settle_up.setAttribute("onClick", "setle_debt(this.id)")


            div_left.appendChild(img_person)
            div_right.appendChild(p_title)
            div_right.appendChild(p_amount)
            div_right.appendChild(button_settle_up)

            li.appendChild(div_left)
            li.appendChild(div_right)

            ul.appendChild(li)

        }
    }

    // ul = document.getElementById("member-list")
    //
    //     for (let member of members) {
    //         li = document.createElement("li")
    //         li.className = "view_item"
    //         div_left = document.createElement("div")
    //         div_left.className = "vi_left"
    //         div_right = document.createElement("div")
    //         div_right.className = "vi_right"
    //         let img_person = document.createElement("img")
    //
    //         let current_user = JSON.parse(localStorage.getItem("current_user"))
    //
    //         if (member.name == current_user) {
    //             img_person.src = "./img/me.png"
    //         }
    //
    //         else{
    //             img_person.src = "./img/person.png"
    //         }
    //
    //         let p_title = document.createElement("p")
    //         p_title.className = 'title'
    //         p_title.textContent = member.name
    //
    //         let p_spent = document.createElement("p")
    //         p_spent.className = "content"
    //         p_spent.textContent = "spent " + member.spent.toString() + '$'
    //
    //         p_amount = document.createElement("p")
    //
    //         if (member.budget < 0){
    //             p_amount.className = "neg_amount"
    //         }
    //
    //         else{
    //             p_amount.className = "amount"
    //         }
    //
    //         p_amount.textContent = member.budget.toString() + '$'
    //
    //
    //         button_edit = document.createElement("button")
    //         button_edit.className = "btn_edit"
    //         button_edit.textContent = "Edit"
    //         button_edit.setAttribute("id", member.id + "edit_member")
    //         button_edit.setAttribute("onClick", "edit_member(this.id)")
    //
    //         button_delete = document.createElement("button")
    //         button_delete.className = "btn_delete"
    //         button_delete.textContent = "Delete"
    //         button_delete.setAttribute("id", member.id + "delete_member")
    //         button_delete.setAttribute("onClick", "delete_member(this.id)")
    //
    //         div_left.appendChild(img_person)
    //         div_right.appendChild(p_title)
    //         div_right.appendChild(p_spent)
    //         div_right.appendChild(p_amount)
    //         div_right.appendChild(button_edit)
    //         div_right.appendChild(button_delete)
    //
    //         li.appendChild(div_left)
    //         li.appendChild(div_right)
    //
    //         ul.appendChild(li)
    //
    //     }
    
}

function template_expenses(){

    let group = []

	let users = []

	let user = new User(0, "Bob", "admin", "admin", 0);
	users.push(user)
	localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("current_user", JSON.stringify("none"));

    let budget_income = 30
    let budget_expenses = 0
    localStorage.setItem("budget_income", JSON.stringify(budget_income));
    localStorage.setItem("budget_expenses", JSON.stringify(budget_expenses));

    let expenses = []

    let new_expense = new Expense(0, "Bob", 30, "Burger", "Food", ["Bill", "Greg"], "./img/receipt.jpg");
    expenses.push(new_expense);

    new_expense = new Expense(1, "Greg", 50, "Rent", "House", ["Bill"], "./img/receipt.jpg");
    expenses.push(new_expense);

    let debts = []

    let new_debt = new Debt(0, "Bill", "Bob", 15)
    debts.push(new_debt)

    new_debt = new Debt(1, "Bill", "Greg", 50)
    debts.push(new_debt)

    new_debt = new Debt(2, "Greg", "Bob", 15)
    debts.push(new_debt)

    let members = []

    let new_memeber = new Member(0, "Bob", 30,  30)
    members.push(new_memeber)

    new_memeber = new Member(1, "Bill", 0, -65)
    members.push(new_memeber)

    new_memeber = new Member(2, "Greg", 50, 35)
    members.push(new_memeber)

    let new_group = new Group(0, "group1", expenses, debts, members)
    group.push(new_group)

    return group
}

function showReceipt(index){
    let groups = JSON.parse(localStorage.getItem("group"))
    let current_group_id = JSON.parse(localStorage.getItem("current_group_id"))
    let group_id = parseInt(current_group_id)
    let current_group = groups[group_id]
    let expenses = current_group.expenses
    img_index = parseInt(index[0])
    let url = expenses[img_index].receipt
	window.open(url, "_blank");
}



