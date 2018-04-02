import { Time } from '@angular/common'
import { Optional } from '@angular/core';

export class Task {

    ///////////////
    // Variables //
    ///////////////
    public id?: string
    public task: string
    public category: string
    public project: string
    public state: string = 'queued'
    public endTime: Date = new Date()
    public targetDurationHours: number
    public targetDurationMinutes: number
    public startTime: Date = new Date()

    //////////////////
    // Constructors //
    //////////////////
    public constructor(

        @Optional() id: string,
        task: string,
        category: string,
        project: string,
        state: string,
        targetDurationHours,
        targetDurationMinutes 

    ) {

        this.id = id
        this.task = task
        this.category = category
        this.project = project
        this.state = state
        this.targetDurationHours = targetDurationHours
        this.targetDurationMinutes = targetDurationMinutes

    }

    public getTask(): string {

        return this.task

    }

    public getProject(): string {

        return this.project

    }

    public getCategory(): string {

        return this.category

    }

    public getState(): string {

        return this.state

    }

    public getStartTime(): Date {

        return this.startTime

    }

    public getEndTime(): Date {

        return this.endTime

    }

    public getTargetDurationHours(): number {

        return this.targetDurationHours

    }

    public getTargetDurationMinutes(): number {

        return this.targetDurationMinutes

    }

    /////////////
    // Setters //
    /////////////

}