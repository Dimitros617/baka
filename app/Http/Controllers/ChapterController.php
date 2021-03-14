<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Chapters;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ChapterController extends Controller
{

    function showChapter($id){

        $data = DB::table('chapters')
            ->where('id', $id)
            ->orderBy('position', 'asc')
            ->get();

        $big_boxes = DB::table('big_box')
            ->join('chapters', 'big_box.parent', '=', 'chapters.id')
            ->where('chapters.id', $id)
            ->select('big_box.id', 'big_box.name', 'big_box.description', 'big_box.img', 'big_box.security', 'big_box.key', 'big_box.position', 'big_box.style')
            ->orderBy('position', 'asc')
            ->get();

        $big_boxes_locks = DB::table('locks')
            ->Join('users', 'locks.user_id', '=', 'users.id')
            ->where('table_name', 'big_box')
            ->where('users.id', Auth::user()->id)
            ->select( 'locks.element_id', 'locks.locked')
            ->get();

        $middle_boxes = DB::table('middle_box')
            ->join('big_box', 'middle_box.parent', '=', 'big_box.id')
            ->join('chapters', 'big_box.parent', '=', 'chapters.id')
            ->where('chapters.id', $id)
            ->select('middle_box.id', 'middle_box.parent', 'middle_box.name', 'middle_box.description', 'middle_box.img', 'middle_box.security', 'middle_box.key', 'middle_box.position', 'middle_box.style')
            ->orderBy('position', 'asc')
            ->get();

        $middle_boxes_locks = DB::table('locks')
            ->Join('users', 'locks.user_id', '=', 'users.id')
            ->where('table_name', 'middle_box')
            ->where('users.id', Auth::user()->id)
            ->select( 'locks.element_id', 'locks.locked')
            ->get();

        $data = $data[0];
        $history = new HistoryController;
        $history->log(Auth::user()->id, 'chapters', $id);

        //TODO zde mazat záznamy starší jak měsíc u každého člověka z historie vstupu

        return view('chapter',
            ['chapter' => $data,
            'big_boxes' => $big_boxes,
            'middle_boxes' => $middle_boxes,
            'big_boxes_locks' => $big_boxes_locks,
            'middle_boxes_locks' => $middle_boxes_locks]);

    }


    function addChapter(){

        Log::info('ChapterController:addChapter');

        $chapter = new Chapters;
        $check = $chapter->save();

        return back();
    }

    function removeChapter(Request $request)
    {
        Log::info('ChapterController:removeChapter');

            $check = true;
            //$check = DB::table('categories')->where('id', $request->id)->delete();

        //TODO dodělat smazání z databáze + obrázek

            return $check ? "1" : "0";
    }

    function statusChapter(Request $request)
    {
        Log::info('ChapterController:statusChapter');

        $check = true;

        //TODO předat data o stavu žáků nad kapitolou

        return view('chapter-status', ['data' => array('James','Dominik','Lukas','Viol')]);
    }

}
