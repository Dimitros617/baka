<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\categories;
use App\Models\loans;
use App\Models\User;
use App\Models\items;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use phpDocumentor\Reflection\Types\True_;
use function PHPUnit\Framework\returnArgument;

class LoansController extends Controller
{

    function showLoans(){

        Log::info('LoansController:showLoans');

        $data = DB::table('loans')->Join('items', 'loans.item', '=', 'items.id')->Join('categories', 'items.categories', '=', 'categories.id')->orderBy('categories.name', 'asc')->orderBy('items.id', 'asc')->select('categories.id as categoryId', 'categories.name as categoryName',  'items.id as itemId', 'items.name as itemName', 'items.note', 'items.place' ,'items.inventory_number' , 'loans.id', 'loans.rent_from', 'loans.rent_to', 'loans.status')->where('loans.user', Auth::user()->id)->get();

        return view('my-loans', ['loans' => $data]);

    }


    function showAllLoans(){

        Log::info('LoansController:showAllLoans');

        $waitingLoans = DB::table('loans')->Join('users', 'loans.user', '=', 'users.id')->Join('items', 'loans.item', '=', 'items.id')->Join('categories', 'items.categories', '=', 'categories.id')->orderBy('categories.name', 'asc')->orderBy('items.id', 'asc')->select('users.id as userId', 'users.name as userName', 'users.surname as userSurname', 'categories.id as categoryId', 'categories.name as categoryName',  'items.id as itemId', 'items.name as itemName', 'items.note', 'items.place' ,'items.inventory_number' , 'loans.id', 'loans.rent_from', 'loans.rent_to', 'loans.status')->where('loans.status', 2)->get();
        $activeLoans = DB::table('loans')->Join('users', 'loans.user', '=', 'users.id')->Join('items', 'loans.item', '=', 'items.id')->Join('categories', 'items.categories', '=', 'categories.id')->orderBy('categories.name', 'asc')->orderBy('items.id', 'asc')->select('users.id as userId', 'users.name as userName', 'users.surname as userSurname',  'categories.id as categoryId', 'categories.name as categoryName',  'items.id as itemId', 'items.name as itemName', 'items.note', 'items.place' ,'items.inventory_number' , 'loans.id', 'loans.rent_from', 'loans.rent_to', 'loans.status')->where('loans.status', 1)->get();

//        return $waitingLoans;
        return view('all-loans', ['waitingLoans' => $waitingLoans, 'activeLoans' => $activeLoans]);

    }

    function saveItemLoans(Request $request)
    {
        Log::info('LoansController:saveItemLoans');

        $borrow = new loans;
        $borrow->user = Auth::id();
        $borrow->item = $request->itemId;
        $borrow->rent_from = $request->rent_from;
        $borrow->rent_to = $request->rent_to;
        $check = $borrow->save();

        if ($check) {
            return back()->withInput(array('saveCheck' => '1'));
        } else {
            return back()->withInput(array('saveCheck' => '0'));
        }

    }

    function showItemLoans($id)
    {

        Log::info('LoansController:showItemStatus');


        $item = items::find($id);
        $users = DB::table('loans')->join('users', 'loans.user', '=', 'users.id')->where('item', $id)->select('users.id', 'users.name', 'users.surname', 'loans.rent_from', 'loans.rent_to', 'loans.id as loanId')->get();

        return view('item-status', ['item' => $item, 'users' => $users]);

    }

    function itemLoansReturn(Request $request){

        Log::info('LoansController:itemLoansReturn');

        if(Auth::permition()->return_verification == 1){

            $check = DB::table('loans')->where('id', $request->loanId)->delete();
        }
        else
        {
            $loan = loans::find($request->loanId);
            $loan->status = $loan->status == 1 ? 2 : 1;
            $check = $loan->save();

        }

            return back()->withInput(array('saveCheck' => $check ? '1' : '0'));

    }

    function showCategoryLoans($id)
    {
        Log::info('CategoryControler:removeCategory');

        $data = DB::table('items')->leftJoin('loans', 'items.id', '=', 'loans.item')->leftJoin('Users', 'loans.user', '=', 'Users.id')->Join('categories', 'items.categories', '=', 'categories.id')->orderBy('categories.name', 'asc')->orderBy('items.id', 'asc')->select('Users.id as userId', 'Users.name', 'Users.surname','categories.id as categoryId', 'categories.name as categoryName',  'items.id as itemId', 'items.name as itemName' , 'loans.id', 'loans.status', 'loans.rent_from', 'loans.rent_to')->where('categories.id', $id)->get();

//        return count($data);
        return view('category-status', ['categories' => $data]);

    }


}
