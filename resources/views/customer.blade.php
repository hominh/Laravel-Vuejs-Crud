@extends('layouts.app')
@section('content')
<meta id="token" name="token" value="{{ csrf_token() }}">
<h1>Customer page</h1>
<div id="app"></div>
<script src="{{ mix('js/app.js') }}"></script>

@endsection()
