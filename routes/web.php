<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

/*Route::get('/login', function() {
    return view('welcome');
}); */

Route::post('/add', 'ClientController@add')->middleware('auth');
Route::get('/list', 'ClientController@list')->middleware('auth');
Route::get('/date', 'ClientController@date')->middleware('auth');
Route::get('/stat', 'ClientController@stat')->middleware('auth');
Route::post('/delete-user', 'ClientController@delete');
Route::post('/register-user', 'AuthController@register');


