<!DOCTYPE html>
<html lang="vi VN">
    <head>
        <meta charset="utf-8">
        <title>Laravel and vuejs CRUD</title>

        <!-- Main styles for this application -->
        <link href="{{ mix('css/app.css') }}" rel="stylesheet">
        <meta id="csrf-token" name="csrf-token" value="{{ csrf_token() }}">
        <script>
            var Laravel = {
                'csrfToken' : '{{csrf_token()}}'
            };
        </script>
    </head>
    <body>
        @yield('content')
    </body>
</html>
