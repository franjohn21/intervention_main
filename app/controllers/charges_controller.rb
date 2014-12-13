class ChargesController < ApplicationController

	def new

	end
	def test
		render :create
	end
	def create
	  # Amount in cents
	  @amount = 2500
	  customer = Stripe::Customer.create(
	    :email => params[:stripeEmail],	
	    :card  => params[:stripeToken]
	  )
	  @email = params[:stripeEmail];
	  charge = Stripe::Charge.create(
	    :customer    => customer.id,
	    :amount      => @amount,
	    :description => 'Intervention Pre-order',
	    :currency    => 'usd',
	    :shipping 	 => {
	    	:address => { :line1 => params[:stripeShippingAddressLine1], :city => params[:stripeShippingAddressCity], :country => params[:stripeShippingAddressCountry], :line2 => params[:stripeShippingAddressApt], :postal_code => params[:stripeShippingAddressZip], :state => params[:stripeShippingAddressState]},
	    	:name => params[:stripeShippingName]
	    },
	    :metadata => {:line1 => params[:stripeShippingAddressLine1], :city => params[:stripeShippingAddressCity], :country => params[:stripeShippingAddressCountry], :line2 => params[:stripeShippingAddressApt], :postal_code => params[:stripeShippingAddressZip], :state => params[:stripeShippingAddressState]}
	  )
	rescue Stripe::CardError => e
	  flash[:error] = e.message
	  redirect_to charges_path
	end


end
