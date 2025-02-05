export type TypeLoad = 'spinner' | 'pulsing' | 'dotted' | 'bars' | 'image'
export type TypeLoadMode = 'all' | 'context' | 'default'

export interface BaseLoaderStyle {
	type?: TypeLoad
	className?: string
	options?: {
		min: boolean
	}
}

export interface LoaderWithId extends BaseLoaderStyle {
	id?: string
	isLoading?: never
	mode?: never
}

export interface LoaderWithIsLoading extends BaseLoaderStyle {
	id?: never
	isLoading: boolean
	mode?: never
}

export interface LoaderWithMode extends BaseLoaderStyle {
	id?: never
	isLoading?: never
	mode?: TypeLoadMode
}

export type LoaderProps = LoaderWithId | LoaderWithIsLoading | LoaderWithMode
