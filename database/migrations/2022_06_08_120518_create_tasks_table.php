<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('status', ['PENDING', 'STARTED', 'FINISHED'])->comment('Pending, Started, Finished')->nullable();
            $table->enum('priority_level', ['LOW', 'NORMAL', 'HIGH', 'URGENT'])->comment('Low, Normal, High, Urgent')->nullable();
            $table->date('completion_date')->nullable();
            $table->time('completion_time')->nullable();
            $table->time('dedicated_time')->nullable();
            $table->time('real_time')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('restrict');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
}
