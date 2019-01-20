let data = [];
fetch('https://sheets.googleapis.com/v4/spreadsheets/1-AUyBRZth0aqr4OD2gtAQ_tEmjB43RLvVDaTkK4ZXgY/values/!A:B?key=AIzaSyABPI0KHYt0jSh_WeElhtpiIYH3BeMocMQ')
	.then(response => {
	return response.json();
	})
	.then(myJson => {
	data = myJson.values;
	createTable(data);
});

function createTable(tableData) {
	var table = document.createElement('table');
	table.setAttribute('id', 'myTable');
	var tableBody = document.createElement('tbody');

	tableData.forEach(rowData => {
		var row = document.createElement('tr');

		rowData.forEach((cellData, index) => {
			var cell = document.createElement('td');
			if(index === 1 ) {
				var link = document.createElement('a');
				link.setAttribute('href', cellData);
				link.setAttribute('target', '_blank');
				link.innerHTML = 'VIEW';
				cell.appendChild(link);
			} else {
				cell.appendChild(document.createTextNode(cellData));
			}
			row.appendChild(cell);
		});

		tableBody.appendChild(row);
	});
	table.appendChild(tableBody);
	document.body.appendChild(table);
}

function searchTable() { 
	var input, filter, table, tr, td, i, txtValue;
	input = document.getElementById("myInput");
	filter = input.value.toUpperCase();
	table = document.getElementById("myTable");
	tr = table.getElementsByTagName("tr");

	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName("td")[0];
		if (td) {
			txtValue = td.textContent || td.innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = "";
			} else {
				tr[i].style.display = "none";
			}
		} 
	}
}