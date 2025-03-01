<!doctype html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>pdf</title>
</head>
<body>
   
 
    <div class="margin-top">
        <table class="details" border="1">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($expenses as $expense)
                <tr>
                    <td>{{ $expense->date }}</td>
                    <td>{{ $expense->description }}</td>
                    <td>{{ $expense->category->name ?? 'N/A' }}</td>
                    <td>{{ number_format($expense->amount, 2) }}</td>
                </tr>
                @endforeach

                <tr>
                    <td colspan="4" style="text-align: right">{{ number_format($totalAmount, 2) }} </td>
                </tr>
            </tbody>
           
        </table>
    </div>
</body>
</html>