<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Schema::create('expenses', function (Blueprint $table) {
        //     $table->id();
        //     $table->text("description");
        //     $table->date("date");
        //     $table->decimal('amount', 8, 2);
        //     $table->foreignId('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
        //     $table->foreignId('category_id')->references('id')->on('categories')->onDelete('cascade');
        //     $table->timestamps();
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {

        // Schema::dropIfExists('expenses');

        // Schema::table('expenses', function (Blueprint $table) {
        //     $table->dropForeign(['category_id']);
        //     $table->dropColumn('category_id');
        // });
    }
};
